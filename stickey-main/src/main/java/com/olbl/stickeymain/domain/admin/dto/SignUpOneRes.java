package com.olbl.stickeymain.domain.admin.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class SignUpOneRes {

    private String name; //단체명
    private String phone; //전화번호
    private String email; //이메일
    private String profileImage; //프로필 이미지

    private String manager; //담당자 이름
    private String address; //주소
    private String registrationNumber; //사업자 번호
    private String registrationFile; //사업자 등록증

}
