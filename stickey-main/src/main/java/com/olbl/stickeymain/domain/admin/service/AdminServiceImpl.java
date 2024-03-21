package com.olbl.stickeymain.domain.admin.service;

import com.olbl.stickeymain.domain.admin.dto.SignUpListRes;
import com.olbl.stickeymain.domain.admin.dto.SignUpRes;
import com.olbl.stickeymain.domain.user.organization.entity.OrganizationStatus;
import com.olbl.stickeymain.domain.user.organization.repository.OrganizationRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class AdminServiceImpl implements AdminService {

    private final OrganizationRepository organizationRepository;

    @Override
    public SignUpListRes getSignUpList() {
        //TODO: 관리자 계정 확인 로직
        List<SignUpRes> signUpResList = organizationRepository.findAllByStatus(
            OrganizationStatus.WAITING);
        return new SignUpListRes(signUpResList, signUpResList.size());
    }
}
