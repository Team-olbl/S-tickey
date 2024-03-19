package com.olbl.stickeymain.domain.user.service;

import com.olbl.stickeymain.domain.user.dto.SignUpReq;
import com.olbl.stickeymain.domain.user.entity.User;
import com.olbl.stickeymain.domain.user.repository.UserRepository;
import com.olbl.stickeymain.global.util.S3Util;
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
}
