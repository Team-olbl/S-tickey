package com.olbl.stickeymain.domain.user.dto;

import java.util.List;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginRes {

    // 회원 PK
    int id;

    // 회원명
    String name;

    // 이메일
    String email;

    // 전화번호
    String phone;

    // 선호 구단
    List<ClubInfoDto> preferences;

    @Builder
    public LoginRes(int id, String name, String email, String phone,
        List<ClubInfoDto> preferences) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.preferences = preferences;
    }
}
