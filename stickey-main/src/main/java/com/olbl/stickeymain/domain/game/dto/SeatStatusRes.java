package com.olbl.stickeymain.domain.game.dto;


import com.olbl.stickeymain.domain.game.entity.SeatStatus;

public interface SeatStatusRes {

    int getSeatNumber();

    SeatStatus getStatus();

}
