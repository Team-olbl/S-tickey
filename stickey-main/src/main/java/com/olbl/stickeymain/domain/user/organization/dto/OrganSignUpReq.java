package com.olbl.stickeymain.domain.user.organization.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
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
    @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[~!@#$%^&*()+|=])[A-Za-z\\d~!@#$%^&*()+|=]{8,16}$")
    private String password; // 패스워드

    @NotBlank
    private String phone; // 전화번호

    @NotBlank
    private String registrationNumber; // 사업자 등록번호

    @NotBlank
    private String address; // 주소

    private String manager; // 담당자명
}