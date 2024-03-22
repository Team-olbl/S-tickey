package com.olbl.stickeymain.domain.user.organization.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrganSignUpReq {

    @NotBlank
    private String name; // 회원명

    @Email
    @NotBlank
    private String email; // 이메일 아이디

    @NotBlank
    private String password; // 패스워드

    @NotBlank
    private String phone; // 전화번호

    @NotBlank
    private String registration_number; // 사업자 등록번호

    @NotBlank
    private String address; // 주소

    private String manager; // 담당자명
}