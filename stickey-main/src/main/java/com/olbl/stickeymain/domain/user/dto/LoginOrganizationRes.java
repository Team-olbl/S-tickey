package com.olbl.stickeymain.domain.user.dto;

import com.olbl.stickeymain.domain.user.organization.entity.Organization;
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

    // 이메일
    String email;

    // 전화번호
    String phone;

    // 프로필 이미지
    String profile;

    // 담당자명
    String manager;

    // 단체 주소
    String address;

    // 사업자등록번호
    String registrationNumber;

    // 사업자등록증
    String registrationFile;

    // 승인 상태
    String status;

    // Entity - DTO 변환
    @Builder
    public LoginOrganizationRes(Organization organization) {
        this.id = organization.getId();
        this.name = organization.getName();
        this.email = organization.getEmail();
        this.phone = organization.getPhone();
        this.profile = organization.getProfileImage();
        this.manager = organization.getManager();
        this.address = organization.getAddress();
        this.registrationNumber = organization.getRegistrationNumber();
        this.registrationFile = organization.getRegistrationFile();
        this.status = String.valueOf(organization.getStatus());
    }
}
