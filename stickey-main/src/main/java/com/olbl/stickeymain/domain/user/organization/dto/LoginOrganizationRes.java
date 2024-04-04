package com.olbl.stickeymain.domain.user.organization.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginOrganizationRes {

    // 회원 PK
    int id;

    // 회원명
    String name;

    // 상태
    String status;

    // Entity - DTO 변환
    @Builder
    public LoginOrganizationRes(int id, String name, String status) {
        this.id = id;
        this.name = name;
        this.status = status;
    }
}
