package com.olbl.stickeymain.domain.support.service;

import com.olbl.stickeymain.domain.support.dto.SupportReq;
import org.springframework.web.multipart.MultipartFile;

public interface SupportService {

    void registSupport(SupportReq supportReq, MultipartFile supportImage);
}
