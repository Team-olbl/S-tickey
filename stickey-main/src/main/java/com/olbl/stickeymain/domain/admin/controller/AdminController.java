package com.olbl.stickeymain.domain.admin.controller;


import static com.olbl.stickeymain.global.result.ResultCode.GET_SIGNUPLIST_SUCCESS;

import com.olbl.stickeymain.domain.admin.dto.SignUpListRes;
import com.olbl.stickeymain.domain.admin.service.AdminService;
import com.olbl.stickeymain.global.result.ResultResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
@Tag(name = "AdminController", description = "관리자 관련 api")
public class AdminController {

    private final AdminService adminService;

    @Operation(summary = "승인 대기 중인 단체 회원 목록 조회")
    @GetMapping("/organizations")
    public ResponseEntity<ResultResponse> getSignUpList() {
        SignUpListRes signUpListRes = adminService.getSignUpList();
        return ResponseEntity.ok(ResultResponse.of(GET_SIGNUPLIST_SUCCESS, signUpListRes));
    }
}
