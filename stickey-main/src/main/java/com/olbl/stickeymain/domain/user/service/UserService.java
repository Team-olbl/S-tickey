package com.olbl.stickeymain.domain.user.service;

import com.olbl.stickeymain.domain.user.dto.EmailCheckReq;
import com.olbl.stickeymain.domain.user.dto.EmailCodeReq;
import com.olbl.stickeymain.domain.user.dto.ProfileRes;
import com.olbl.stickeymain.domain.user.dto.PreferenceReq;
import com.olbl.stickeymain.domain.user.dto.SignUpReq;
import org.springframework.web.multipart.MultipartFile;

public interface UserService {

    // 회원 가입
    void signup(SignUpReq signUpReq, MultipartFile profile);

    // 인증 코드 확인
    public boolean checkAuthEmail(EmailCheckReq emailCheckReq);

    // 비밀번호 찾기
    String findPassword(EmailCodeReq emailCodeReq);

    ProfileRes getProfile(int id);

    void modifyPreference(PreferenceReq preferenceReq);
}
