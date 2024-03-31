package com.olbl.stickeymain.domain.notify.service;

import com.olbl.stickeymain.domain.notify.dto.NotifyRes;
import com.olbl.stickeymain.domain.notify.entity.NotificationType;
import com.olbl.stickeymain.domain.notify.entity.Notify;
import com.olbl.stickeymain.domain.notify.repository.EmitterRepository;
import com.olbl.stickeymain.domain.notify.repository.NotifyRepository;
import com.olbl.stickeymain.domain.user.entity.User;
import com.olbl.stickeymain.global.auth.CustomUserDetails;
import java.io.IOException;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@Slf4j
@Service
@RequiredArgsConstructor
public class NotifyService {

    // SSE 연결 지속 시간 설정
    private static final Long DEFAULT_TIMEOUT = 60L * 1000 * 60;

    private final EmitterRepository emitterRepository;
    private final NotifyRepository notifyRepository;

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
        emitters.forEach(
            (key, emitter) -> {
                emitterRepository.saveEventCache(key, notification);
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


}
