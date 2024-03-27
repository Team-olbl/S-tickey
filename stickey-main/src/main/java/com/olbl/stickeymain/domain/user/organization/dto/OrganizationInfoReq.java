package com.olbl.stickeymain.domain.user.organization.dto;

import lombok.Getter;

@Getter
public class OrganizationInfoReq {

    private String name;
    private String email;
    private String phone;
    private String manager;
    private String address;
    private String registrationNumber;

}
