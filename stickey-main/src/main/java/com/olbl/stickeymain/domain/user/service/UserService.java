package com.olbl.stickeymain.domain.user.service;

import com.olbl.stickeymain.domain.user.dto.SignUpReq;
import org.springframework.web.multipart.MultipartFile;

public interface UserService {

  void signup(SignUpReq signUpReq, MultipartFile profile);

}
