package com.olbl.stickeymain.domain.user.service;

import com.olbl.stickeymain.domain.user.dto.EmailCodeReq;
import com.olbl.stickeymain.domain.user.dto.SignUpReq;
import com.olbl.stickeymain.domain.user.entity.User;
import com.olbl.stickeymain.domain.user.repository.UserRepository;
import com.olbl.stickeymain.global.result.error.ErrorCode;
import com.olbl.stickeymain.global.result.error.exception.BusinessException;
import com.olbl.stickeymain.global.util.S3Util;
import java.util.Random;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final S3Util s3Util;


    @Override
    public void signup(SignUpReq userJoinReq, MultipartFile profile) {
        // 프로필 이미지 업로드 (없다면 기본 이미지)
        String fileUrl = "individual/profile/anonymous.png";
        if (profile != null) {
            fileUrl = s3Util.uploadFile(profile, 0);
        }

        // 가입 정보 입력
        User user = User.builder()
            .name(userJoinReq.getName())
            .email(userJoinReq.getEmail())
            .password(bCryptPasswordEncoder.encode(userJoinReq.getPassword()))
            .phone(userJoinReq.getPhone())
            .profileImage(fileUrl)
            .build();

        // DB 저장
        userRepository.save(user);
    }

    @Override
    public String findPassword(EmailCodeReq emailCodeReq) {
        // 회원이 존재하는지 확인
        User user = userRepository.findByEmail(emailCodeReq.getEmail())
            .orElseThrow(() -> new BusinessException(ErrorCode.USER_NOT_EXISTS));

        // 임시 비밀번호 생성
        StringBuilder newPassword = new StringBuilder();
        Random random = new Random();
        for (int i = 0; i < 15; i++) {
            int idx = random.nextInt(3);

            switch (idx) {
                case 0: // 영어 소문자
                    newPassword.append((char) (random.nextInt(26) + 97));
                    break;
                case 1: // 영어 대문자
                    newPassword.append((char) (random.nextInt(26) + 65));
                    break;
                default: // 숫자
                    newPassword.append(random.nextInt(10));
            }
        }

        user.changePassword(newPassword.toString());
        return newPassword.toString();
    }
}
