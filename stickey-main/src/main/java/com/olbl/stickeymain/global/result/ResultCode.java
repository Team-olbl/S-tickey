package com.olbl.stickeymain.global.result;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ResultCode {

    //Member
    REGIST_SUCCESS(201, "회원가입에 성공하였습니다."),

    //Game
    GAME_REGISTER_SUCCESS(201, "경기 등록에 성공하였습니다."),
    GET_REMAINING_SEATS_SUCCESS(200, "구역 별 잔여좌석 조회에 성공하였습니다."),
    GET_GAMES_SUCCESS(200, "게임 목록 조회에 성공하였습니다.");

    private final int status;
    private final String message;

}
