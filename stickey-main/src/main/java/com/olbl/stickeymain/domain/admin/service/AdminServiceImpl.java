package com.olbl.stickeymain.domain.admin.service;

import static com.olbl.stickeymain.domain.support.entity.SupportStatus.WAITING;
import static com.olbl.stickeymain.global.result.error.ErrorCode.ORGANIZATION_SIGNUP_DO_NOT_EXISTS;
import static com.olbl.stickeymain.global.result.error.ErrorCode.ORGANIZATION_SIGNUP_NOT_WAITING;

import com.olbl.stickeymain.domain.admin.dto.SignUpListRes;
import com.olbl.stickeymain.domain.admin.dto.SignUpOneRes;
import com.olbl.stickeymain.domain.admin.dto.SignUpRes;
import com.olbl.stickeymain.domain.admin.dto.WaitingSupportListRes;
import com.olbl.stickeymain.domain.admin.dto.WaitingSupportRes;
import com.olbl.stickeymain.domain.support.repository.SupportRepository;
import com.olbl.stickeymain.domain.user.organization.entity.Organization;
import com.olbl.stickeymain.domain.user.organization.entity.OrganizationStatus;
import com.olbl.stickeymain.domain.user.organization.repository.OrganizationRepository;
import com.olbl.stickeymain.global.result.error.exception.BusinessException;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class AdminServiceImpl implements AdminService {

    private final OrganizationRepository organizationRepository;
    private final SupportRepository supportRepository;

    @Override
    public SignUpListRes getSignUpList() {
        //TODO: 관리자 계정 확인 로직
        List<SignUpRes> signUpResList = organizationRepository.findAllByStatus(
            OrganizationStatus.WAITING);
        return new SignUpListRes(signUpResList, signUpResList.size());
    }

    @Override
    public SignUpOneRes getSignUp(int id) {
        //TODO: 관리자 계정 확인 로직
        Organization organization = organizationRepository.findById(id)
            .orElseThrow(() -> new BusinessException(ORGANIZATION_SIGNUP_DO_NOT_EXISTS));
        if (organization.getStatus() != OrganizationStatus.WAITING) {
            throw new BusinessException(ORGANIZATION_SIGNUP_NOT_WAITING);
        }

        SignUpOneRes signUpOneRes = new SignUpOneRes();

        signUpOneRes.setName(organization.getName());
        signUpOneRes.setPhone(organization.getPhone());
        signUpOneRes.setEmail(organization.getEmail());
        signUpOneRes.setProfileImage(organization.getProfileImage());
        signUpOneRes.setManager(organization.getManager());
        signUpOneRes.setAddress(organization.getAddress());
        signUpOneRes.setRegistrationNumber(organization.getRegistrationNumber());
        signUpOneRes.setRegistrationFile(organization.getRegistrationFile());

        return signUpOneRes;
    }

    @Override
    public WaitingSupportListRes getWaitingSupportList() {
        //TODO: 관리자 계정 확인 로직
        List<WaitingSupportRes> waitingSupportRes = supportRepository.findAllByStatus(WAITING);
        return new WaitingSupportListRes(waitingSupportRes, waitingSupportRes.size());
    }
}
