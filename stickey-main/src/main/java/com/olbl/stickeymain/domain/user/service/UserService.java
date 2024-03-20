package com.olbl.stickeymain.domain.user.service;

import com.olbl.stickeymain.domain.user.dto.EmailCodeReq;
import com.olbl.stickeymain.domain.user.dto.SignUpReq;
import org.springframework.web.multipart.MultipartFile;

public interface UserService {

    // 회원가입
    void signup(SignUpReq signUpReq, MultipartFile profile);

    // 비밀번호 찾기
    String findPassword(EmailCodeReq emailCodeReq);
}
