package com.olbl.stickeymain.global.result;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ResultCode {

    //Member
    REGIST_SUCCESS(201, "회원가입에 성공하였습니다.");

    private final int status;
    private final String message;

}
