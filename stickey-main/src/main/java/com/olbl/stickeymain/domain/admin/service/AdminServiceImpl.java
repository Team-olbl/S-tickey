package com.olbl.stickeymain.domain.admin.service;

import static com.olbl.stickeymain.domain.support.entity.SupportStatus.WAITING;
import static com.olbl.stickeymain.domain.user.organization.entity.OrganizationStatus.ACCEPTED;
import static com.olbl.stickeymain.domain.user.organization.entity.OrganizationStatus.REJECTED;
import static com.olbl.stickeymain.global.result.error.ErrorCode.ORGANIZATION_SIGNUP_DO_NOT_EXISTS;
import static com.olbl.stickeymain.global.result.error.ErrorCode.ORGANIZATION_SIGNUP_NOT_WAITING;
import static com.olbl.stickeymain.global.result.error.ErrorCode.SUPPORT_DO_NOT_EXISTS;
import static com.olbl.stickeymain.global.result.error.ErrorCode.SUPPORT_NOT_WAITING;

import com.olbl.stickeymain.domain.admin.dto.ConfirmReq;
import com.olbl.stickeymain.domain.admin.dto.SignUpListRes;
import com.olbl.stickeymain.domain.admin.dto.SignUpOneRes;
import com.olbl.stickeymain.domain.admin.dto.SignUpRes;
import com.olbl.stickeymain.domain.admin.dto.WaitingSupportListRes;
import com.olbl.stickeymain.domain.admin.dto.WaitingSupportOneRes;
import com.olbl.stickeymain.domain.admin.dto.WaitingSupportRes;
import com.olbl.stickeymain.domain.notify.service.NotifyService;
import com.olbl.stickeymain.domain.support.entity.Support;
import com.olbl.stickeymain.domain.support.entity.SupportStatus;
import com.olbl.stickeymain.domain.support.repository.SupportRepository;
import com.olbl.stickeymain.domain.user.organization.entity.Organization;
import com.olbl.stickeymain.domain.user.organization.entity.OrganizationStatus;
import com.olbl.stickeymain.domain.user.organization.repository.OrganizationRepository;
import com.olbl.stickeymain.domain.user.repository.UserRepository;
import com.olbl.stickeymain.global.result.error.exception.BusinessException;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class AdminServiceImpl implements AdminService {

    private final OrganizationRepository organizationRepository;
    private final SupportRepository supportRepository;
    private final UserRepository userRepository;

    private final NotifyService notifyService;

    @Override
    public SignUpListRes getSignUpList() {
        List<SignUpRes> signUpResList = organizationRepository.findAllByStatus(
            OrganizationStatus.WAITING);
        return new SignUpListRes(signUpResList, signUpResList.size());
    }

    @Override
    public SignUpOneRes getSignUp(int id) {
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
    @Transactional
    public void confirmOrganization(int id, ConfirmReq confirmReq) {
        Organization organization = organizationRepository.findById(id)
            .orElseThrow(() -> new BusinessException(ORGANIZATION_SIGNUP_DO_NOT_EXISTS));
        if (organization.getStatus() != OrganizationStatus.WAITING) {
            throw new BusinessException(ORGANIZATION_SIGNUP_NOT_WAITING);
        }

        if (confirmReq.getStatus().equals("1")) {
            organization.setStatus(ACCEPTED);
            organization.setMessage(null);
        } else if (confirmReq.getStatus().equals("2")) {
            organization.setStatus(REJECTED);
            organization.setMessage(confirmReq.getMessage());
        }

        notifyService.notifyOrganizationSignup(organization, organization.getStatus());
        organizationRepository.save(organization);
    }

    @Override
    public WaitingSupportListRes getWaitingSupportList() {
        List<WaitingSupportRes> waitingSupportRes = supportRepository.findAllByStatus(WAITING);
        return new WaitingSupportListRes(waitingSupportRes, waitingSupportRes.size());
    }

    @Override
    public WaitingSupportOneRes getWaitingSupport(int id) {
        WaitingSupportOneRes waitingSupportOneRes = supportRepository.findOneById(id)
            .orElseThrow(() -> new BusinessException(SUPPORT_DO_NOT_EXISTS));

        return waitingSupportOneRes;
    }

    @Override
    @Transactional
    public void confirmSupport(int id, ConfirmReq confirmReq) {
        Support support = supportRepository.findById(id)
            .orElseThrow(() -> new BusinessException(SUPPORT_DO_NOT_EXISTS));

        if (support.getStatus() != SupportStatus.WAITING) {
            throw new BusinessException(SUPPORT_NOT_WAITING);
        }

        if (confirmReq.getStatus().equals("1")) {
            support.setStatus(SupportStatus.ACCEPTED);
            support.setMessage(null);
        } else if (confirmReq.getStatus().equals("2")) {
            support.setStatus(SupportStatus.REJECTED);
            support.setMessage(confirmReq.getMessage());
        }

        notifyService.notifyOrganizationSupport(support.getOrganization(), support.getStatus());
        supportRepository.save(support);
    }
}
