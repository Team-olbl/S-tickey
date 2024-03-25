package com.olbl.stickeymain.domain.user.organization.service;

import com.olbl.stickeymain.domain.user.entity.Role;
import com.olbl.stickeymain.domain.user.organization.dto.OrganSignUpReq;
import com.olbl.stickeymain.domain.user.organization.entity.Organization;
import com.olbl.stickeymain.domain.user.organization.entity.OrganizationStatus;
import com.olbl.stickeymain.domain.user.organization.repository.OrganizationRepository;
import com.olbl.stickeymain.global.result.error.ErrorCode;
import com.olbl.stickeymain.global.result.error.exception.BusinessException;
import com.olbl.stickeymain.global.util.S3Util;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class OrganizationServiceImpl implements OrganizationService {

    private final S3Util s3Util;
    private final BCryptPasswordEncoder passwordEncoder;
    private final OrganizationRepository organizationRepository;

    @Override
    public void signup(OrganSignUpReq organSignUpReq, MultipartFile profile,
        MultipartFile registrationFile) {

        // 프로필 이미지 업로드 (없다면 기본 이미지)
        String profileUrl = "organization/profile/anonymous.png";
        if (profile != null) {
            profileUrl = s3Util.uploadFile(profile, 1);
        }

        // 사업자 등록증 업로드 (없다면 오류 발생)
        if (registrationFile.isEmpty()) {
            throw new BusinessException(ErrorCode.REGISTRATION_FILE_NOT_FOUND);
        }
        String fileUrl = s3Util.uploadFile(registrationFile, 3);

        // 가입 정보 입력
        Organization organization = Organization.builder()
            .name(organSignUpReq.getName())
            .email(organSignUpReq.getEmail())
            .password(passwordEncoder.encode(organSignUpReq.getPassword()))
            .phone(organSignUpReq.getPhone())
            .profileImage(profileUrl)
            .manager(organSignUpReq.getManager())
            .address(organSignUpReq.getAddress())
            .registrationNumber(organSignUpReq.getRegistrationNumber())
            .registrationFile(fileUrl)
            .status(OrganizationStatus.WAITING)
            .role(Role.ORGANIZATION)
            .build();

        // DB 저장
        organizationRepository.save(organization);
    }
}
