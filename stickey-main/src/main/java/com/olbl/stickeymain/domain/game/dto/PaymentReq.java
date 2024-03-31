package com.olbl.stickeymain.domain.game.dto;

import java.util.List;
import lombok.Getter;

@Getter
public class PaymentReq {

    private List<Integer> seatNumbers;
    private int gameId;
    private int zoneId;
    private Boolean isRefund; // 환불:true, 결제:false

}
