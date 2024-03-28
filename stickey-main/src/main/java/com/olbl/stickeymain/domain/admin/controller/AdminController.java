package com.olbl.stickeymain.domain.admin.controller;


import static com.olbl.stickeymain.global.result.ResultCode.CONFIRM_ORGANIZATION_SUCCESS;
import static com.olbl.stickeymain.global.result.ResultCode.CONFIRM_SUPPORT_SUCCESS;
import static com.olbl.stickeymain.global.result.ResultCode.GET_SIGNUPLIST_SUCCESS;
import static com.olbl.stickeymain.global.result.ResultCode.GET_SIGNUP_SUCCESS;
import static com.olbl.stickeymain.global.result.ResultCode.GET_WAITING_SUPPORT_LIST_SUCCESS;
import static com.olbl.stickeymain.global.result.ResultCode.GET_WAITING_SUPPORT_SUCCESS;

import com.olbl.stickeymain.domain.admin.dto.ConfirmReq;
import com.olbl.stickeymain.domain.admin.dto.SignUpListRes;
import com.olbl.stickeymain.domain.admin.dto.SignUpOneRes;
import com.olbl.stickeymain.domain.admin.dto.WaitingSupportListRes;
import com.olbl.stickeymain.domain.admin.dto.WaitingSupportOneRes;
import com.olbl.stickeymain.domain.admin.service.AdminService;
import com.olbl.stickeymain.global.result.ResultResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
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

    @Operation(summary = "단체 회원 승인, 거절 api")
    @PatchMapping("/organizations/{id}")
    public ResponseEntity<ResultResponse> confirmOrganization(@PathVariable(value = "id") int id,
        @RequestBody @Valid ConfirmReq confirmReq) {
        adminService.confirmOrganization(id, confirmReq);
        return ResponseEntity.ok(ResultResponse.of(CONFIRM_ORGANIZATION_SUCCESS));
    }

    @Operation(summary = "승인 대기 중인 단체 회원 상세 조회")
    @GetMapping("/organizations/{id}")
    public ResponseEntity<ResultResponse> getSignUp(@PathVariable(value = "id") int id) {
        SignUpOneRes signUpOneRes = adminService.getSignUp(id);
        return ResponseEntity.ok(ResultResponse.of(GET_SIGNUP_SUCCESS, signUpOneRes));
    }

    @Operation(summary = "승인 대기 후원 목록 조회")
    @GetMapping("/supports")
    public ResponseEntity<ResultResponse> getWaitingSupportList() {
        WaitingSupportListRes waitingSupportListRes = adminService.getWaitingSupportList();
        return ResponseEntity.ok(
            ResultResponse.of(GET_WAITING_SUPPORT_LIST_SUCCESS, waitingSupportListRes));
    }

    @Operation(summary = "승인 대기 후원 글 상세 조회")
    @GetMapping("/supports/{id}")
    public ResponseEntity<ResultResponse> getWaitingSupport(@PathVariable(value = "id") int id) {
        WaitingSupportOneRes waitingSupport = adminService.getWaitingSupport(id);
        return ResponseEntity.ok(
            ResultResponse.of(GET_WAITING_SUPPORT_SUCCESS, waitingSupport));
    }

    @Operation(summary = "후원 승인, 거절 api")
    @PatchMapping("/supports/{id}")
    public ResponseEntity<ResultResponse> confirmSupport(@PathVariable(value = "id") int id,
        @RequestBody @Valid ConfirmReq confirmReq) {
        adminService.confirmSupport(id, confirmReq);
        return ResponseEntity.ok(ResultResponse.of(CONFIRM_SUPPORT_SUCCESS));
    }

}
