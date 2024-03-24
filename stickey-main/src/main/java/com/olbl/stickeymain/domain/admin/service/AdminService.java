package com.olbl.stickeymain.domain.admin.service;

import com.olbl.stickeymain.domain.admin.dto.SignUpListRes;
import com.olbl.stickeymain.domain.admin.dto.SignUpOneRes;

public interface AdminService {

    SignUpListRes getSignUpList();

    SignUpOneRes getSignUp(int id);
}
