package com.olbl.stickeymain.domain.user.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class SignUpReq {

  @NotBlank
  private String name; // 회원명

  @Email
  @NotBlank
  private String email; // 이메일 아이디

  @NotBlank
  private String password; // 패스워드

  @NotBlank
  private String phone; // 전화번호

}
