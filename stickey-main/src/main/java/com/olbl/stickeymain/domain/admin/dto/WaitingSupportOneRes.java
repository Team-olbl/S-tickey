package com.olbl.stickeymain.domain.admin.dto;

import java.time.LocalDateTime;

public interface WaitingSupportOneRes {

    int getId(); //후원 글 id

    String getTitle(); //제목

    String getContent(); //내용

    LocalDateTime getStartTime(); //후원 시작 시간

    LocalDateTime getEndTime(); //후원 종료 시간

    OrganizationProfile getOrganization();

    interface OrganizationProfile {

        String getProfileImage();

        String getName();

        String getWallet();
    }
}
