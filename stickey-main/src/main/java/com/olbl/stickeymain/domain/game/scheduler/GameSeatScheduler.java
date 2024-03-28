package com.olbl.stickeymain.domain.game.scheduler;

import com.olbl.stickeymain.domain.game.entity.Game;
import com.olbl.stickeymain.domain.game.repository.GameRepository;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.ListOperations;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class GameSeatScheduler {

    private final GameRepository gameRepository;
    private final StringRedisTemplate redisTemplate;

    //TODO: 테스트 이후에 시간 늘리기
    @Scheduled(fixedRate = 600000 * 2) // 20분마다 실행
    public void checkAndExecuteTask() {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime twentyMinutesFromNow = now.plusMinutes(20);

        List<Game> upcomingGames = gameRepository.findByBookStartTimeBetween(now,
            twentyMinutesFromNow);

        for (Game game : upcomingGames) {
            //TODO: 예매 오픈 20분 전 알림 보내기
            //TODO: gameSeat 테이블 세팅 (spring batch)

            //redis에 좌석 정보 넣기
            ListOperations<String, String> listOps = redisTemplate.opsForList();
            Integer[] zones = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12}; //구역 id
            int seatsPerSection = 30; //구역 별 좌석 수로 변경

            for (Integer zone : zones) {
                String key = "game:" + game.getId() + ":zone:" + zone;
                Boolean exists = redisTemplate.hasKey(key); //키가 이미 존재하는지 확인
                if (Boolean.FALSE.equals(exists)) {
                    List<String> seats = new ArrayList<>();
                    for (int seat = 1; seat <= seatsPerSection; seat++) {
                        seats.add("AVAILABLE"); //초기 상태 AVAILABLE
                    }
                    listOps.rightPushAll(key, seats); // Redis에 좌석 상태 정보 저장
                }
            }
        }
    }
}
