package com.olbl.stickeymain.domain.user.organization.controller;

import static com.olbl.stickeymain.global.result.ResultCode.DELETE_PLAYER_SUCCESS;
import static com.olbl.stickeymain.global.result.ResultCode.GET_ORGANIZATION_INFO_SUCCESS;
import static com.olbl.stickeymain.global.result.ResultCode.GET_PLAYERS_SUCCESS;
import static com.olbl.stickeymain.global.result.ResultCode.GET_SUPPORT_LIST_SUCCESS;
import static com.olbl.stickeymain.global.result.ResultCode.GET_SUPPORT_SUCCESS;
import static com.olbl.stickeymain.global.result.ResultCode.MODIFY_ORGANIZATION_INFO_SUCCESS;
import static com.olbl.stickeymain.global.result.ResultCode.REGIST_PLAYER_SUCCESS;
import static com.olbl.stickeymain.global.result.ResultCode.REQUEST_SUPPORT_SUCCESS;

import com.olbl.stickeymain.domain.support.dto.SupportReq;
import com.olbl.stickeymain.domain.user.dto.MySupportListRes;
import com.olbl.stickeymain.domain.user.dto.MySupportOneRes;
import com.olbl.stickeymain.domain.user.organization.dto.OrganizationInfoReq;
import com.olbl.stickeymain.domain.user.organization.dto.OrganizationInfoRes;
import com.olbl.stickeymain.domain.user.organization.dto.PlayerListRes;
import com.olbl.stickeymain.domain.user.organization.dto.PlayerReq;
import com.olbl.stickeymain.domain.user.organization.service.OrganizationService;
import com.olbl.stickeymain.global.result.ResultResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/organizations")
@Tag(name = "OrganizationController", description = "단체기관 관련 api")
public class OrganizationController {

    private final OrganizationService organizationService;

    @Operation(summary = "단체 유저 정보 조회")
    @GetMapping("/profile")
    public ResponseEntity<ResultResponse> getOrganizationUserInfo() {
        OrganizationInfoRes organizationUserInfo = organizationService.getOrganizationUserInfo();
        return ResponseEntity.ok(
            ResultResponse.of(GET_ORGANIZATION_INFO_SUCCESS, organizationUserInfo));
    }

    @Operation(summary = "단체 유저 정보 수정/재요청")
    @PatchMapping(value = "/profile", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ResultResponse> modifyOrganizationUserInfo(@RequestPart
    OrganizationInfoReq organizationInfoReq, @RequestPart(required = false) MultipartFile profile,
        @RequestPart(required = false) MultipartFile registrationFile) {
        organizationService.modifyOrganizationUserInfo(organizationInfoReq, profile,
            registrationFile);
        return ResponseEntity.ok(ResultResponse.of(MODIFY_ORGANIZATION_INFO_SUCCESS));
    }

    @Operation(summary = "단체 소속 선수 목록 조회")
    @GetMapping("/profile/players")
    public ResponseEntity<ResultResponse> getPlayers() {
        PlayerListRes playerListRes = organizationService.getPlayers();
        return ResponseEntity.ok(ResultResponse.of(GET_PLAYERS_SUCCESS, playerListRes));
    }

    @Operation(summary = "단체 소속 선수 등록")
    @PostMapping(value = "/profile/players", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ResultResponse> registPlayer(
        @RequestPart(value = "playerReq") @Valid PlayerReq playerReq,
        @RequestPart(value = "profile") MultipartFile profile) {
        organizationService.registPlayer(playerReq, profile);
        return ResponseEntity.ok(ResultResponse.of(REGIST_PLAYER_SUCCESS));
    }

    @Operation(summary = "단체 소속 선수 삭제")
    @DeleteMapping("/profile/players/{id}")
    public ResponseEntity<ResultResponse> deletePlayer(@PathVariable(value = "id") int id) {
        organizationService.deletePlayer(id);
        return ResponseEntity.ok(ResultResponse.of(DELETE_PLAYER_SUCCESS));
    }

    @Operation(summary = "작성한 후원 글 목록 조회")
    @GetMapping("/profile/supports")
    public ResponseEntity<ResultResponse> getMySupports(Pageable pageable) {
        MySupportListRes mySupports = organizationService.getMySupports(pageable);
        return ResponseEntity.ok(ResultResponse.of(GET_SUPPORT_LIST_SUCCESS, mySupports));
    }

    @Operation(summary = "작성한 후원 글 상세 조회")
    @GetMapping("/profile/supports/{id}")
    public ResponseEntity<ResultResponse> getMySupportOne(@PathVariable int id) {
        MySupportOneRes mySupports = organizationService.getMySupportOne(id);
        return ResponseEntity.ok(ResultResponse.of(GET_SUPPORT_SUCCESS, mySupports));
    }

    @Operation(summary = "후원 글 등록 재요청")
    @PatchMapping("/profile/supports/{id}")
    public ResponseEntity<ResultResponse> requestRegistSupport(@PathVariable(value = "id") int id,
        @RequestBody SupportReq supportReq) {
        organizationService.requestRegistSupport(id, supportReq);
        return ResponseEntity.ok(ResultResponse.of(REQUEST_SUPPORT_SUCCESS));
    }
}
