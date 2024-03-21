package com.olbl.stickeymain.global.result.error;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrorCode {

    //Global
    INTERNAL_SERVER_ERROR(500, "내부 서버 오류입니다."),
    METHOD_NOT_ALLOWED(405, "허용되지 않은 HTTP method입니다."),
    INPUT_VALUE_INVALID(400, "유효하지 않은 입력입니다."),
    INPUT_TYPE_INVALID(400, "입력 타입이 유효하지 않습니다."),
    HTTP_MESSAGE_NOT_READABLE(400, "request message body가 없거나, 값 타입이 올바르지 않습니다."),
    HTTP_HEADER_INVALID(400, "request header가 유효하지 않습니다."),
    ENTITY_NOT_FOUNT(500, "존재하지 않는 Entity입니다."),
    FORBIDDEN_ERROR(403, "작업을 수행하기 위한 권한이 없습니다."),
    IS_NOT_IMAGE(400, "이미지가 아닙니다."),

    //Game
    SPORTS_CLUB_DO_NOT_EXISTS(400, "존재하지 않는 스포츠 구단입니다."),
    GAME_DO_NOT_EXISTS(400, "존재하지 않는 경기입니다."),
    STADIUM_DO_NOT_EXISTS(400, "존재하지 않는 경기장입니다."),

    //Mail
    EMAIL_VERIFICATION_NOT_EXISTS(400, "유효한 인증 번호가 존재하지 않습니다."),
    EMAIL_VERIFICATION_INVAID(400, "인증 번호가 일치하지 않습니다."),
    USER_NOT_EXISTS(400, "존재하지 않는 회원입니다."),
    EMAIL_ALREADY_EXISTS(400, "이미 존재하는 이메일입니다.");

    private final int status;
    private final String message;

}