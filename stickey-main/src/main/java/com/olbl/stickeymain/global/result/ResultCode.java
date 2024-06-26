package com.olbl.stickeymain.global.result;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ResultCode {

    //User
    REGIST_SUCCESS(201, "회원가입에 성공하였습니다."),
    VERIFICATION_SUCCESS(200, "이메일 인증에 성공하였습니다."),
    SEND_EMAIL_SUCCESS(200, "요청한 이메일로 메일이 발송되었습니다."),
    CHECK_EMAIL_SUCCESS(200, "이메일 인증에 성공하였습니다."),
    TOKEN_REISSUE_SUCCESS(200, "액세스 토큰 재발급에 성공하였습니다."),
    GET_PROFILE_SUCCESS(200, "프로필 조회에 성공하였습니다."),
    MODIFY_PREFERENCE_SUCCESS(204, "선호구단 수정에 성공하였습니다."),
    GET_USER_INFO_SUCCESS(200, "개인 회원 유저 정보 조회에 성공하였습니다."),
    UPDATE_USER_INFO_SUCCESS(204, "개인 회원 유저 정보 수정에 성공하였습니다."),
    UPDATE_USER_PASSWORD_SUCCESS(204, "개인 회원 유저의 비밀번호 수정에 성공하였습니다."),

    //Organization
    GET_PLAYERS_SUCCESS(200, "단체 소속 선수 조회에 성공하였습니다."),
    REGIST_PLAYER_SUCCESS(201, "단체 소속 선수 등록에 성공하였습니다."),
    DELETE_PLAYER_SUCCESS(204, "단체 소속 선수 삭제에 성공하였습니다."),
    GET_SUPPORT_LIST_SUCCESS(200, "내가 작성한 후원 글 목록 조회에 성공하였습니다."),
    GET_SUPPORT_SUCCESS(200, "내가 작성한 후원 글 상세 조회에 성공하였습니다."),
    REQUEST_SUPPORT_SUCCESS(204, "후원 글 등록 재요청에 성공하였습니다."),
    GET_ORGANIZATION_INFO_SUCCESS(200, "단체 유저 정보 조회에 성공하였습니다."),
    MODIFY_ORGANIZATION_INFO_SUCCESS(204, "단체 유저 정보 수정/재요청에 성공하였습니다."),

    //Admin
    GET_SIGNUPLIST_SUCCESS(200, "승인 대기중인 단체 회원 목록 조회에 성공하였습니다."),
    CONFIRM_ORGANIZATION_SUCCESS(204, "단체 회원 상태 정보 변경에 성공하였습니다."),
    GET_SIGNUP_SUCCESS(200, "승인 대기중인 단체 회원 조회에 성공하였습니다."),
    GET_WAITING_SUPPORT_LIST_SUCCESS(200, "승인 대기중인 후원 목록 조회에 성공하였습니다."),
    GET_WAITING_SUPPORT_SUCCESS(200, "승인 대기중인 후원 글 상세 조회에 성공하였습니다."),
    CONFIRM_SUPPORT_SUCCESS(204, "후원 글 상태 정보 변경에 성공하였습니다."),

    //Game
    GAME_REGISTER_SUCCESS(201, "경기 등록에 성공하였습니다."),
    STADIUM_SEAT_REGIST_SUCCESS(201, "구역별 좌석 등록에 성공하였습니다."),
    GET_REMAINING_SEATS_SUCCESS(200, "구역 별 잔여좌석 조회에 성공하였습니다."),
    GET_SEAT_STATUS_SUCCESS(200, "전체 좌석 상태 정보 조회에 성공하였습니다."),
    GET_GAMES_SUCCESS(200, "게임 목록 조회에 성공하였습니다."),
    GET_CLUBS_SUCCESS(200, "구단 목록 조회에 성공하였습니다."),
    HOLD_SEATS_SUCCESS(200, "좌석 선점에 성공하였습니다."),
    HOLD_SEATS_FAIL(200, "이미 선택된 좌석입니다."),
    PAYMENT_SUCCESS(200, "좌석 결제/환불에 성공하였습니다."),
    REMOVE_RUNNING_QUEUE_SUCCESS(200, "참가열에서 삭제되었습니다."),

    //Support
    GET_SUPPORTID_BY_ITEM_SUCCESS(200, "후원될 글 조회에 성공하였습니다."),
    SUPPORT_REGISTER_SUCCESS(201, "후원 글 등록에 성공하였습니다."),
    GET_SUPPORTLIST_SUCCESS(200, "후원 글 목록 조회에 성공하였습니다."),
    GET_SUPPORTONE_SUCCESS(200, "후원 글 상세 조회에 성공하였습니다.");

    private final int status;
    private final String message;

}
