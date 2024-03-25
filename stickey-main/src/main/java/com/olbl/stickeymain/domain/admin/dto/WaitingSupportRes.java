package com.olbl.stickeymain.domain.admin.dto;

public interface WaitingSupportRes {

    String getTitle();

    int getId();

    OrganizationProfile getOrganization();

    interface OrganizationProfile {

        String getProfileImage();

        String getName();

        int getId();
    }
}
