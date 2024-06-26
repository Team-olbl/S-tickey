package com.olbl.stickeymain.domain.support.service;

import com.olbl.stickeymain.domain.support.dto.SupportByItemRes;
import com.olbl.stickeymain.domain.support.dto.SupportListRes;
import com.olbl.stickeymain.domain.support.dto.SupportOneRes;
import com.olbl.stickeymain.domain.support.dto.SupportReq;
import org.springframework.web.multipart.MultipartFile;

public interface SupportService {

    void registSupport(SupportReq supportReq, MultipartFile supportImage);

    SupportListRes getSupportList(Integer flag);

    SupportOneRes getSupportOneById(int supportId);

    SupportByItemRes getSupportByItem();
}
