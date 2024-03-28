package com.olbl.stickeymain.domain.game.scheduler;

import com.olbl.stickeymain.domain.game.entity.Game;
import com.olbl.stickeymain.domain.game.entity.GameSeat;
import com.olbl.stickeymain.domain.game.repository.GameRepository;
import com.olbl.stickeymain.domain.game.repository.GameSeatRepository;
import java.time.LocalDateTime;
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

    private final GameSeatRepository gameSeatRepository;
    private final GameRepository gameRepository;
    private final StringRedisTemplate redisTemplate;

    //TODO: 테스트 이후에 시간 수정하기
    @Scheduled(cron = "0 48 16 * * *") //오후 4시 45분에 실행
    public void checkAndExecuteTask() {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime twentyMinutesFromNow = now.plusMinutes(20);

        List<Game> upcomingGames = gameRepository.findByBookStartTimeBetween(now,
            twentyMinutesFromNow);

        for (Game game : upcomingGames) {
            //TODO: 예매 오픈 20분 전 알림 보내기
            //TODO: gameSeat 테이블 세팅 (spring batch)

            List<GameSeat> gameSeatList = gameSeatRepository.findByGameId(game.getId());

            //redis에 좌석 정보 넣기
            ListOperations<String, String> listOps = redisTemplate.opsForList();

            for (GameSeat gameSeat : gameSeatList) {
                String key = "game:" + gameSeat.getGame().getId() + ":zone:" + gameSeat.getZoneId();

                String seat = gameSeat.getStatus().toString();
                listOps.rightPush(key, seat);
            }
        }
    }
}
