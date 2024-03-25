package com.olbl.stickeymain.domain.support.controller;

import static com.olbl.stickeymain.global.result.ResultCode.SUPPORT_REGISTER_SUCCESS;

import com.olbl.stickeymain.domain.support.dto.SupportReq;
import com.olbl.stickeymain.domain.support.service.SupportService;
import com.olbl.stickeymain.global.result.ResultResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@RestController
@RequestMapping("/support")
@RequiredArgsConstructor
@Tag(name = "SupportController", description = "후원 관련 api")
public class SupportController {

    private final SupportService supportService;

    @Operation(summary = "후원 글 등록")
    @PostMapping
    public ResponseEntity<ResultResponse> registSupport(
        @RequestPart(value = "supportReq") SupportReq supportReq,
        @RequestPart(value = "support_image") MultipartFile supportImage) {
        supportService.registSupport(supportReq, supportImage);
        return ResponseEntity.ok(ResultResponse.of(SUPPORT_REGISTER_SUCCESS));
    }


}
