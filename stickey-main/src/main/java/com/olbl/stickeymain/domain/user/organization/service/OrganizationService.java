package com.olbl.stickeymain.domain.user.organization.service;

import com.olbl.stickeymain.domain.user.organization.dto.OrganSignUpReq;
import com.olbl.stickeymain.domain.user.organization.dto.PlayerListRes;
import org.springframework.web.multipart.MultipartFile;

public interface OrganizationService {

    void signup(OrganSignUpReq organSignUpReq, MultipartFile profile,
        MultipartFile registrationFile);

    PlayerListRes getPlayers();
}
