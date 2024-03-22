package com.olbl.stickeymain.domain.game.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LeftSeatRes {

    private int zoneId; //구역 id
    private String zoneName; //구역 명
    private long totalSeatCnt; //총 좌석 수
    private long leftSeatCnt; //잔여 좌석 수
    private int price; //구역 별 좌석 가격

}
