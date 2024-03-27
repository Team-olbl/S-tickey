package com.olbl.stickeywaiting.service;

import com.olbl.stickeywaiting.dto.WaitStateRes;
import java.util.Iterator;
import java.util.Set;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class WaitingServiceImpl implements WaitingService {

    private final RedisTemplate<String, String> redisTemplate;
    private final SimpMessagingTemplate template;
    private final int popAmount = 3; // 한 번에 작업열로 이동 시킬 사람의 수
    private final String baseWaitKey = "wait::";
    private final String baseRunKey = "run::";

    // 특정 경기의 대기열에 유저 추가
    @Override
    public Long addToWaitQueue(int id, int gameId) {
        // 대기열 등록
        String key = baseWaitKey + gameId;
        double score = System.currentTimeMillis();

        redisTemplate.opsForZSet().add(key, String.valueOf(id), score);
        log.info("[Waiting] 대기열 입장 유저 : {}, 경기 : {}", id, gameId);

        // 현재 순위 리턴
        return redisTemplate.opsForZSet().rank(key, String.valueOf(id));
    }

    // 2초마다 일정 인원을 작업열로 이동시킨다
    @Scheduled(cron = "0/2 * * * * *")
    @Override
    public void moveToRunQueue() {
        log.info("[Waiting] 대기열 스케줄러 시작");

        // 현재 Redis에 존재하는 모든 대기열 Key를 불러온다
        Set<String> redisKeys = redisTemplate.keys(baseWaitKey + "*");
        Iterator<String> it = redisKeys.iterator();

        // 모든 대기열에 대해 스케줄링
        while (it.hasNext()) {
            String waitKey = it.next();
            String gameId = waitKey.split("::")[1];
            String runKey = baseRunKey + gameId;

            // 작업열로 진입 가능한 Capability 확인
            Long capability = popAmount - redisTemplate.opsForZSet().size(runKey);
            if (capability > 0) {
                // 이번 차례인 경우, 대기열에서 Capability만큼을 꺼낸다
                Set<String> waitQue = redisTemplate.opsForZSet().range(waitKey, 0, capability - 1);
                log.info("Game {} Pass : {}", gameId, waitQue.size());

                for (String s : waitQue) {
                    // 대기열에서 해당 유저 정보 삭제
                    redisTemplate.opsForZSet().remove(waitKey, s);

                    // 작업열로 해당 유저 이동
                    redisTemplate.opsForZSet().add(runKey, s, System.currentTimeMillis());

                    // 본인 차례임을 표시하고 응답
                    WaitStateRes res = WaitStateRes.builder()
                        .myTurn(true) // 본인 차례 여부
                        .key(UUID.randomUUID().toString()) // 고유 랜덤 ID
                        .rank(0)
                        .build();
                    template.convertAndSend("/sub/id/" + s, res);
                }
            }

            // 이번 차례가 아닌 경우, 그냥 값만 가져와서 반환한다
            Set<String> leftQue = redisTemplate.opsForZSet().range(waitKey, 0, -1);
            log.info("Game {} left : {}", gameId, leftQue.size());

            int idx = 1;
            for (String s : leftQue) {
                // 본인 차례가 아님을 표시하고 응답
                WaitStateRes res = WaitStateRes.builder()
                    .myTurn(false) // 본인 차례 여부
                    .rank(idx++)
                    .key(null)
                    .build();

                template.convertAndSend("/sub/id/" + s, res);
            }
        }
    }
}
