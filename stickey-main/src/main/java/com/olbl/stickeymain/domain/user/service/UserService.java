package com.olbl.stickeymain.domain.user.service;

import com.olbl.stickeymain.domain.user.dto.EmailCheckReq;
import com.olbl.stickeymain.domain.user.dto.EmailCodeReq;
import com.olbl.stickeymain.domain.user.dto.PreferenceReq;
import com.olbl.stickeymain.domain.user.dto.ProfileRes;
import com.olbl.stickeymain.domain.user.dto.SignUpReq;
import com.olbl.stickeymain.domain.user.dto.UserInfoReq;
import com.olbl.stickeymain.domain.user.dto.UserInfoRes;
import org.springframework.security.core.Authentication;
import org.springframework.web.multipart.MultipartFile;

public interface UserService {

    // 회원 가입
    void signup(SignUpReq signUpReq, MultipartFile profile);

    // 인증 코드 확인
    public boolean checkAuthEmail(EmailCheckReq emailCheckReq);

    // 비밀번호 찾기
    String findPassword(EmailCodeReq emailCodeReq);

    // 프로필 조회
    ProfileRes getProfile(Authentication authentication);

    // 선호구단 조회 및 수정
    void modifyPreference(PreferenceReq preferenceReq, Authentication authentication);

    UserInfoRes getUserInfo();

    void updateUserInfo(UserInfoReq userInfoReq, MultipartFile profile);
}
