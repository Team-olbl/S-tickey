package com.olbl.stickeymain.global.result;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ResultCode {

    //Member
    REGIST_SUCCESS(201, "회원가입에 성공하였습니다."),
    VERIFICATION_SUCCESS(200, "이메일 인증에 성공하였습니다."),
    SEND_EMAIL_SUCCESS(200, "요청한 이메일로 메일이 발송되었습니다."),
    CHECK_EMAIL_SUCCESS(200, "이메일 인증에 성공하였습니다."),
    TOKEN_REISSUE_SUCCESS(200, "액세스 토큰 재발급에 성공하였습니다."),

    //Admin
    GET_SIGNUPLIST_SUCCESS(200, "승인 대기중인 단체 회원 목록 조회에 성공하였습니다."),
    CONFIRM_ORGANIZATION_SUCCESS(200, "단체 회원 상태 정보 변경에 성공하였습니다."),
    GET_SIGNUP_SUCCESS(200, "승인 대기중인 단체 회원 조회에 성공하였습니다."),
    GET_WAITING_SUPPORT_LIST_SUCCESS(200, "승인 대기중인 후원 목록 조회에 성공하였습니다."),

    //Game
    GAME_REGISTER_SUCCESS(201, "경기 등록에 성공하였습니다."),
    GET_REMAINING_SEATS_SUCCESS(200, "구역 별 잔여좌석 조회에 성공하였습니다."),
    GET_SEAT_STATUS_SUCCESS(200, "전체 좌석 상태 정보 조회에 성공하였습니다."),
    GET_GAMES_SUCCESS(200, "게임 목록 조회에 성공하였습니다."),

    //Support
    SUPPORT_REGISTER_SUCCESS(201, "후원 글 등록에 성공하였습니다."),
    GET_SUPPORTLIST_SUCCESS(200, "후원 글 목록 조회에 성공하였습니다.");

    private final int status;
    private final String message;

}
