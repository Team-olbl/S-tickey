package com.olbl.stickeymain.domain.user.organization.service;

import com.olbl.stickeymain.domain.user.dto.MySupportOneRes;
import com.olbl.stickeymain.domain.user.organization.dto.OrganSignUpReq;
import com.olbl.stickeymain.domain.user.organization.dto.PlayerListRes;
import com.olbl.stickeymain.domain.user.organization.dto.PlayerReq;
import org.springframework.web.multipart.MultipartFile;

public interface OrganizationService {

    void signup(OrganSignUpReq organSignUpReq, MultipartFile profile,
        MultipartFile registrationFile);

    PlayerListRes getPlayers();

    void registPlayer(PlayerReq playerReq, MultipartFile profile);

    void deletePlayer(int id);

    MySupportOneRes getMySupportOne(int id);
}
