package com.olbl.stickeywaiting.service;

import com.olbl.stickeywaiting.dto.WaitStateRes;
import com.olbl.stickeywaiting.util.RedisUtil;
import java.util.Iterator;
import java.util.Set;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class WaitingServiceImpl implements WaitingService {

    private final RedisUtil redisUtil;
    private final SimpMessagingTemplate template;
    private final int popAmount = 3; // 한 번에 작업열로 이동 시킬 사람의 수
    private final String baseWaitKey = "wait::";
    private final String baseRunKey = "run::";

    // 특정 경기의 대기열에 유저 추가
    @Override
    public Long addToWaitQueue(int id, int gameId) {
        // 대기열 등록
        String key = baseWaitKey + gameId;
        redisUtil.addToQueue(key, String.valueOf(id), System.currentTimeMillis());
        log.info("[Waiting] 대기열 입장 유저 : {}, 경기 : {}", id, gameId);

        // 현재 순위 리턴
        return redisUtil.getRankFromQueue(key, id);
    }

    // 특정 경기의 대기열에서 유저 삭제
    @Override
    public boolean cancelWaitQueue(int id, int gameId) {
        // 대기열에 있는지 확인
        String key = baseWaitKey + gameId;
        return redisUtil.removeFromQueue(key, String.valueOf(id));
    }

    // 1초마다 일정 인원을 작업열로 이동시키고, 참가열에 만료된 유저를 제거한다
    @Scheduled(cron = "0/1 * * * * *")
    @Override
    public void moveToRunQueue() {
        // REDIS에 존재하는 모든 참가열에 대해 참가열 만료 유저 삭제
        log.info("[Running] 참가열 스케줄링 : ", System.currentTimeMillis());
        Iterator<String> runKeys = redisUtil.getKeys(baseRunKey);
        while (runKeys.hasNext()) {
            String runKey = runKeys.next();

            // 10분이 지나 세션이 만료된 유저 제거
            Long now = System.currentTimeMillis();

            redisUtil.removeFromQueueByRange(runKey, 0L, now - 300000);
        }

        // REDIS에 존재하는 모든 대기열에 대해 작업열 이동 스케줄링
        log.info("[Waiting] 대기열 스케줄링 : ", System.currentTimeMillis());
        Iterator<String> waitKeys = redisUtil.getKeys(baseWaitKey);

        while (waitKeys.hasNext()) {
            String waitKey = waitKeys.next();
            String gameId = waitKey.split("::")[1];
            String runKey = baseRunKey + gameId;

            // 작업열로 진입 가능한 Capability 확인
            Long capability = popAmount - redisUtil.sizeOfQueue(runKey);
            if (capability > 0) {
                // 이번 차례인 경우, 대기열에서 Capability만큼을 꺼낸다
                Set<String> waitQue = redisUtil.getFromQueueByRange(waitKey, 0L, capability - 1);

                for (String s : waitQue) {
                    // 대기열에서 해당 유저 정보 삭제 후, 참가열로 이동
                    redisUtil.removeFromQueue(waitKey, s);
                    redisUtil.addToQueue(runKey, s, System.currentTimeMillis());

                    // 본인 차례임을 표시하고 응답
                    WaitStateRes res = WaitStateRes.builder()
                        .myTurn(true)
                        .key(UUID.randomUUID().toString())
                        .rank(0)
                        .build();

                    template.convertAndSend("/sub/id/" + s, res);
                }
            }

            // 이번 차례가 아닌 경우, 그냥 값만 가져와서 반환한다
            Set<String> leftQue = redisUtil.getFromQueueByRange(waitKey, 0L, -1L);

            int idx = 1;
            for (String s : leftQue) {
                // 본인 차례가 아님을 표시하고 응답
                WaitStateRes res = WaitStateRes.builder()
                    .myTurn(false)
                    .rank(idx++)
                    .key(null)
                    .build();

                template.convertAndSend("/sub/id/" + s, res);
            }

            log.info("[Waiting] 경기 : {}, 대기열 유지 : {}", waitKey, leftQue.size());
        }
    }
}
