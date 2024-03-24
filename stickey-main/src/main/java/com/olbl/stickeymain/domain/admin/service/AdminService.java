package com.olbl.stickeymain.domain.admin.service;

import com.olbl.stickeymain.domain.admin.dto.SignUpListRes;
import com.olbl.stickeymain.domain.admin.dto.SignUpOneRes;
import com.olbl.stickeymain.domain.admin.dto.WaitingSupportListRes;

public interface AdminService {

    SignUpListRes getSignUpList();

    SignUpOneRes getSignUp(int id);

    void confirmOrganization(int id, String status);

    WaitingSupportListRes getWaitingSupportList();
}
