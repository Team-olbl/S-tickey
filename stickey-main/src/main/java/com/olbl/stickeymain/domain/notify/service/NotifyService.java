package com.olbl.stickeymain.domain.notify.service;

import com.olbl.stickeymain.domain.game.entity.Game;
import com.olbl.stickeymain.domain.game.entity.SportsClub;
import com.olbl.stickeymain.domain.game.repository.GameRepository;
import com.olbl.stickeymain.domain.notify.dto.NotifyRes;
import com.olbl.stickeymain.domain.notify.entity.NotificationType;
import com.olbl.stickeymain.domain.notify.entity.Notify;
import com.olbl.stickeymain.domain.notify.repository.EmitterRepository;
import com.olbl.stickeymain.domain.notify.repository.NotifyRepository;
import com.olbl.stickeymain.domain.user.entity.Preference;
import com.olbl.stickeymain.domain.user.entity.User;
import com.olbl.stickeymain.domain.user.repository.PreferenceRepository;
import com.olbl.stickeymain.global.auth.CustomUserDetails;
import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@Slf4j
@Service
@RequiredArgsConstructor
public class NotifyService {

    // SSE 연결 지속 시간 설정
    private static final Long DEFAULT_TIMEOUT = 60L * 1000 * 60;

    private final EmitterRepository emitterRepository;
    private final NotifyRepository notifyRepository;
    private final GameRepository gameRepository;
    private final PreferenceRepository preferenceRepository;

    // subscribe
    public SseEmitter subscribe(String lastEventId) {
        CustomUserDetails userDetails = (CustomUserDetails) SecurityContextHolder.getContext()
            .getAuthentication().getPrincipal();
        int userId = userDetails.getId();

        String emitterId = makeTimeIncludeId(userId);
        SseEmitter emitter = emitterRepository.save(emitterId, new SseEmitter(DEFAULT_TIMEOUT));
        //SseEmitter 완료 or timeout 시 해당 emitter 삭제
        emitter.onCompletion(() -> emitterRepository.deleteById(emitterId));
        emitter.onTimeout(() -> emitterRepository.deleteById(emitterId));

        // 최초 연결 시 503 에러를 방지하기 위한 더미 이벤트 전송
        String eventId = makeTimeIncludeId(userId);
        sendNotification(emitter, eventId, emitterId,
            "EventStream Created. [userId=" + userId + "]");

        // 클라이언트가 미수신한 Event 목록이 존재할 경우 전송하여 Event 유실을 예방
        if (hasLostData(lastEventId)) {
            sendLostData(lastEventId, userId, emitterId, emitter);
        }

        return emitter;
    }

    private String makeTimeIncludeId(int userId) {
        return userId + "_" + System.currentTimeMillis();
    }

    private void sendNotification(SseEmitter emitter, String eventId, String emitterId,
        Object data) {
        try {
            log.info("sendNotification");
            emitter.send(SseEmitter.event()
                .id(eventId)
                .name("sse")
                .data(data)
            );
        } catch (IOException exception) {
            emitterRepository.deleteById(emitterId);
        }
    }

    private boolean hasLostData(String lastEventId) {
        return !lastEventId.isEmpty();
    }

    private void sendLostData(String lastEventId, int userId, String emitterId,
        SseEmitter emitter) {
        Map<String, Object> eventCaches = emitterRepository.findAllEventCacheStartWithByUserId(
            userId);
        eventCaches.entrySet().stream()
            .filter(entry -> lastEventId.compareTo(entry.getKey()) < 0)
            .forEach(
                entry -> sendNotification(emitter, entry.getKey(), emitterId, entry.getValue()));
    }

    // send
    public void send(User receiver, NotificationType notificationType, String content) {
        Notify notification = notifyRepository.save(
            createNotification(receiver, notificationType, content));

        int receiverId = receiver.getId();
        String eventId = receiverId + "_" + System.currentTimeMillis();
        Map<String, SseEmitter> emitters = emitterRepository.findAllEmitterStartWithByUserId(
            receiverId);
        log.info("send 도착 : {}", emitters.size());
        emitters.forEach(
            (key, emitter) -> {
                emitterRepository.saveEventCache(key, notification);
                log.info("key : {}, emitter : {}", key, emitter);
                sendNotification(emitter, eventId, key,
                    NotifyRes.createResponse(notification));
            }
        );
    }

    private Notify createNotification(User receiver, NotificationType notificationType,
        String content) {
        return Notify.builder()
            .receiver(receiver)
            .notificationType(notificationType)
            .content(content)
            .build();
    }

    // 선호 구단 경기 정보 업데이트 알림 보내기 매일 오후 5시
    @Transactional
    @Scheduled(cron = "0 00 17 * * ?")
    public void notifyGameUpdate() {
        // 내일 시작하는 경기 조회
        LocalDate tomorrow = LocalDate.now().plusDays(1);
        LocalDateTime startOfTomorrow = LocalDateTime.of(tomorrow, LocalTime.MIDNIGHT);
        LocalDateTime endOfTomorrow = LocalDateTime.of(tomorrow.plusDays(1), LocalTime.MIDNIGHT);
        List<Game> gameIdList = gameRepository.findByGameStartTimeBetween(startOfTomorrow,
            endOfTomorrow);

        if (gameIdList.isEmpty()) {
            log.info("내일 시작하는 경기가 없습니다.");
        } else {
            log.info("Game List : {}", gameIdList.size());
            for (Game game : gameIdList) {
                log.info("Game Id: {}", game.getId());
                // team1, team2를 선호하는 회원 id 찾기
                SportsClub team1 = game.getHomeTeam();
                SportsClub team2 = game.getAwayTeam();
                List<SportsClub> teams = Arrays.asList(team1, team2);
                List<Preference> preferences = preferenceRepository.findBySportsClubIn(teams);

                // 회원들한테 team1 vs team2 알림 보내기
                if (preferences.isEmpty()) {
                    log.info("notifyGameUpdate :: 해당 팀들을 선호하는 회원이 없습니다.");
                } else {
                    preferences.forEach(preference -> {
                        User user = preference.getUser();
                        String content = String.format(
                            "%s vs %s : 선호 구단의 경기 일정이 업데이트 되었습니다. 지금 확인해보세요!",
                            team1.getName(), team2.getName());
                        log.info(content);
                        send(user, NotificationType.GAME, content);
                    });
                }
            }
        }
    }
}
