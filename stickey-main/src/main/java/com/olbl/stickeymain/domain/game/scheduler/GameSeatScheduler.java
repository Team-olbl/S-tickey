package com.olbl.stickeymain.domain.game.scheduler;

import com.olbl.stickeymain.domain.game.entity.Game;
import com.olbl.stickeymain.domain.game.entity.GameSeat;
import com.olbl.stickeymain.domain.game.repository.GameRepository;
import com.olbl.stickeymain.domain.game.repository.GameSeatRepository;
import java.time.LocalDateTime;
import java.util.List;
import java.util.concurrent.TimeUnit;
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

    @Scheduled(cron = "0 10 20 * * *") //매일 오후 20시 실행
    public void checkAndExecuteTask() {

        LocalDateTime now = LocalDateTime.now();
        LocalDateTime OneHourAfterFromNow = now.plusHours(23).plusMinutes(59).plusSeconds(59);

        List<Game> upcomingGames = gameRepository.findByBookStartTimeBetween(now,
            OneHourAfterFromNow); // 하루 뒤에 시작되는 경기 정보 가져오기

        log.info("게임 있나:" + upcomingGames.getFirst().getId());

        for (Game game : upcomingGames) {
            List<GameSeat> gameSeatList = gameSeatRepository.findByGameId(game.getId());
            LocalDateTime gameStartTime = game.getGameStartTime();

            int expire = gameStartTime.getNano() - now.getNano();

            //redis에 좌석 정보 넣기
            ListOperations<String, String> listOps = redisTemplate.opsForList();

            for (GameSeat gameSeat : gameSeatList) {
                String key = "game:" + gameSeat.getGame().getId() + ":zone:" + gameSeat.getZoneId();
                String seat = gameSeat.getStatus().toString();

                listOps.rightPush(key, seat);
                setTtlForListKey(key, expire);
            }
        }
    }

    public void setTtlForListKey(String key, long timeout) {
        redisTemplate.expire(key, timeout, TimeUnit.NANOSECONDS);
    }
}
