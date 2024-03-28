package com.olbl.stickeymain.domain.game.dto;

import java.util.List;
import lombok.Getter;

@Getter
public class PaymentReq {

    //최종 좌석 상태  결제 가능한지 요청할때 받아야 하는 정보
    private List<Integer> seatNumbers;
    private int gameId;
    private int zoneId;

}
