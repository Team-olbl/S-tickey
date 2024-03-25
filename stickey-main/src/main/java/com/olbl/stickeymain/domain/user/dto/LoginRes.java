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

    // 선호 구단
    List<ClubInfoDto> preferences;

    @Builder
    public LoginRes(int id, List<ClubInfoDto> preferences) {
        this.id = id;
        this.preferences = preferences;
    }
}
