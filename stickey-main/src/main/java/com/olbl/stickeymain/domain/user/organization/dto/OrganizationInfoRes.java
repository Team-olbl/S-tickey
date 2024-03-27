package com.olbl.stickeymain.domain.user.organization.dto;

import com.olbl.stickeymain.domain.user.organization.entity.OrganizationStatus;

public interface OrganizationInfoRes {

    int getId(); //기관 id값

    String getName(); //기관명

    String getEmail(); //이메일

    String getPhone(); //전화번호

    String getProfileImage(); //프로필 이미지

    String getManager(); //담당자명

    String getAddress(); //주소

    String getRegistrationNumber(); //사업자 등록번호

    String getRegistrationFile(); //파일

    OrganizationStatus getStatus(); //기관 승인 상태

    String getMessage(); // 거절 메시지

}
