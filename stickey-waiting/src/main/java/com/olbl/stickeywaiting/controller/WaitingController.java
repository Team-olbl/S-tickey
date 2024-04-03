package com.olbl.stickeywaiting.controller;

import com.olbl.stickeywaiting.dto.CancelRes;
import com.olbl.stickeywaiting.dto.WaitReq;
import com.olbl.stickeywaiting.dto.WaitRes;
import com.olbl.stickeywaiting.service.WaitingService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@EnableScheduling
@RequiredArgsConstructor
public class WaitingController {

    private final SimpMessagingTemplate template;
    private final WaitingService waitingService;

    // 대기열 입장
    @MessageMapping("/enter")
    public void addToWaitQueue(@RequestBody WaitReq waitReq) {
        // 요청 클라이언트를 대기열에 추가
        Long rank = waitingService.addToWaitQueue(waitReq.getId(), waitReq.getGameId()) + 1;

        // 클라이언트에 메시지 전송
        template.convertAndSend("/sub/id/" + waitReq.getId(), new WaitRes(rank));
    }

    // 대기열 취소
    @MessageMapping("/cancel")
    public void cancelWaitQueue(@RequestBody WaitReq waitReq) {
        // 요청 클라이언트가 대기열에 있는지 확인
        boolean isSuccess = waitingService.cancelWaitQueue(waitReq.getId(), waitReq.getGameId());

        // 클라이언트에 메시지 전송
        template.convertAndSend("/sub/id" + waitReq.getId(), new CancelRes(isSuccess));
    }
}
