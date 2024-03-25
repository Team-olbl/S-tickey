package com.olbl.stickeymain.domain.user.controller;

import static com.olbl.stickeymain.global.result.ResultCode.CHECK_EMAIL_SUCCESS;
import static com.olbl.stickeymain.global.result.ResultCode.REGIST_SUCCESS;
import static com.olbl.stickeymain.global.result.ResultCode.SEND_EMAIL_SUCCESS;

import com.olbl.stickeymain.domain.user.dto.EmailCheckReq;
import com.olbl.stickeymain.domain.user.dto.EmailCodeReq;
import com.olbl.stickeymain.domain.user.dto.SignUpReq;
import com.olbl.stickeymain.domain.user.organization.dto.OrganSignUpReq;
import com.olbl.stickeymain.domain.user.organization.service.OrganizationService;
import com.olbl.stickeymain.domain.user.service.MailService;
import com.olbl.stickeymain.domain.user.service.UserService;
import com.olbl.stickeymain.global.result.ResultResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Tag(name = "users", description = "회원 API")
public class UserController {

    private final UserService userService;
    private final MailService mailService;
    private final OrganizationService organizationService;

    @Operation(summary = "회원가입")
    @Transactional
    @PostMapping(value = "/signup", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ResultResponse> signup(
        @RequestPart(value = "signUpReq") SignUpReq signUpReq,
        @RequestPart(value = "profile") MultipartFile profile) {
        userService.signup(signUpReq, profile);
        return ResponseEntity.ok(ResultResponse.of(REGIST_SUCCESS));
    }

    @Operation(summary = "이메일 인증 코드 발송")
    @PostMapping("/auth")
    public ResponseEntity<ResultResponse> sendAuthEmail(
        @RequestBody @Valid EmailCodeReq emailCodeReq) {
        mailService.sendAuthEmail(emailCodeReq);
        return ResponseEntity.ok(ResultResponse.of(SEND_EMAIL_SUCCESS));
    }


    @Operation(summary = "이메일 인증 코드 확인")
    @PostMapping("/auth-check")
    public ResponseEntity<ResultResponse> checkAuthEmail(
        @RequestBody @Valid EmailCheckReq emailCheckReq) {
        boolean state = userService.checkAuthEmail(emailCheckReq);
        return ResponseEntity.ok(ResultResponse.of(CHECK_EMAIL_SUCCESS, state));
    }

    @Operation(summary = "이메일로 임시 비밀번호 발송")
    @Transactional
    @PatchMapping
    public ResponseEntity<ResultResponse> findPassword(@RequestBody EmailCodeReq emailCodeReq) {
        String newPassword = userService.findPassword(emailCodeReq); // 임시 비밀번호 발급
        mailService.sendPasswordEmail(emailCodeReq.getEmail(), newPassword); // 이메일 발송
        return ResponseEntity.ok(ResultResponse.of(SEND_EMAIL_SUCCESS));
    }

    @Operation(summary = "단체 회원가입")
    @Transactional
    @PostMapping(value = "/signup/organization", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ResultResponse> signupOrganization(
        @RequestPart(value = "organSignUpReq") OrganSignUpReq organSignUpReq,
        @RequestPart(value = "profile") MultipartFile profile,
        @RequestPart(value = "registration_file") MultipartFile registration_file) {
        organizationService.signup(organSignUpReq, profile, registration_file);
        return ResponseEntity.ok(ResultResponse.of(REGIST_SUCCESS));
    }
}
