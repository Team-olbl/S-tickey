package com.olbl.stickeymain.domain.support.service;

import com.olbl.stickeymain.domain.support.dto.SupportReq;
import com.olbl.stickeymain.domain.support.entity.Support;
import com.olbl.stickeymain.domain.support.entity.SupportStatus;
import com.olbl.stickeymain.domain.support.repository.SupportRepository;
import com.olbl.stickeymain.domain.user.organization.entity.Organization;
import com.olbl.stickeymain.domain.user.organization.repository.OrganizationRepository;
import com.olbl.stickeymain.global.result.error.ErrorCode;
import com.olbl.stickeymain.global.result.error.exception.BusinessException;
import com.olbl.stickeymain.global.util.S3Util;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class SupportServiceImpl implements SupportService {

    //Repository
    private final SupportRepository supportRepository;
    private final OrganizationRepository organizationRepository;

    // s3Util
    private final S3Util s3Util;

    @Override
    @Transactional
    public void registSupport(SupportReq supportReq, MultipartFile supportImage) {
        //TODO: token으로부터 organizationID 가져오는 코드 작성
        Organization organization = organizationRepository.findById(1)
            .orElseThrow(() -> new BusinessException(ErrorCode.USER_NOT_EXISTS));
        
        //TODO: 기본 이미지는 추후에 S:tickey 로고로 변경하기
        String fileURL = null;
        if (supportImage != null) {
            fileURL = s3Util.uploadFile(supportImage, 5);
        }

        Support support = Support.builder()
            .organization(organization) // 임시 후원 단체 id
            .title(supportReq.getTitle())
            .content(supportReq.getContent())
            .startTime(supportReq.getStartTime())
            .endTime(supportReq.getEndTime())
            .status(SupportStatus.WAITING)
            .supportImage(fileURL)
            .build();

        // DB 저장
        supportRepository.save(support);
    }

}
