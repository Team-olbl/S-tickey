package com.olbl.stickeymain.domain.user.organization.service;

import com.olbl.stickeymain.domain.support.dto.SupportReq;
import com.olbl.stickeymain.domain.user.dto.MySupportListRes;
import com.olbl.stickeymain.domain.user.dto.MySupportOneRes;
import com.olbl.stickeymain.domain.user.organization.dto.OrganSignUpReq;
import com.olbl.stickeymain.domain.user.organization.dto.OrganizationInfoRes;
import com.olbl.stickeymain.domain.user.organization.dto.PlayerListRes;
import com.olbl.stickeymain.domain.user.organization.dto.PlayerReq;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

public interface OrganizationService {

    void signup(OrganSignUpReq organSignUpReq, MultipartFile profile,
        MultipartFile registrationFile);

    PlayerListRes getPlayers();

    void registPlayer(PlayerReq playerReq, MultipartFile profile);

    void deletePlayer(int id);

    MySupportListRes getMySupports(Pageable pageable);

    MySupportOneRes getMySupportOne(int id);

    void requestRegistSupport(int id, SupportReq supportReq);

    OrganizationInfoRes getOrganizationUserInfo();
}
