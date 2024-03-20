package com.olbl.stickeymain.domain.user.service;

import com.olbl.stickeymain.domain.user.dto.EmailCodeReq;

public interface MailService {

    // 6자리 인증 코드 생성
    public String createAuthCode();

    // 인증 코드 메일 발송
    public String sendAuthEmail(EmailCodeReq emailCodeReq);

}
