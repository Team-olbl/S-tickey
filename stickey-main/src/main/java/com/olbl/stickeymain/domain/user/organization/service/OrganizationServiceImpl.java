package com.olbl.stickeymain.domain.user.organization.service;

import static com.olbl.stickeymain.global.result.error.ErrorCode.ORGANIZATION_DO_NOT_EXISTS;
import static com.olbl.stickeymain.global.result.error.ErrorCode.PLAYER_DO_NOT_EXISTS;
import static com.olbl.stickeymain.global.result.error.ErrorCode.PLAYER_NOT_IN_ORGANIZATION;
import static com.olbl.stickeymain.global.result.error.ErrorCode.SUPPORT_DO_NOT_EXISTS;
import static com.olbl.stickeymain.global.result.error.ErrorCode.SUPPORT_DO_NOT_REJECTED;
import static com.olbl.stickeymain.global.result.error.ErrorCode.SUPPORT_NOT_MATCH;
import static com.olbl.stickeymain.global.result.error.ErrorCode.USER_NOT_EXISTS;

import com.olbl.stickeymain.domain.support.dto.SupportReq;
import com.olbl.stickeymain.domain.support.entity.Support;
import com.olbl.stickeymain.domain.support.entity.SupportStatus;
import com.olbl.stickeymain.domain.support.repository.SupportRepository;
import com.olbl.stickeymain.domain.user.dto.MySupportListRes;
import com.olbl.stickeymain.domain.user.dto.MySupportOneRes;
import com.olbl.stickeymain.domain.user.dto.MySupportRes;
import com.olbl.stickeymain.domain.user.entity.Role;
import com.olbl.stickeymain.domain.user.entity.User;
import com.olbl.stickeymain.domain.user.organization.dto.OrganSignUpReq;
import com.olbl.stickeymain.domain.user.organization.dto.OrganizationInfoReq;
import com.olbl.stickeymain.domain.user.organization.dto.OrganizationInfoRes;
import com.olbl.stickeymain.domain.user.organization.dto.PlayerListRes;
import com.olbl.stickeymain.domain.user.organization.dto.PlayerReq;
import com.olbl.stickeymain.domain.user.organization.dto.PlayerRes;
import com.olbl.stickeymain.domain.user.organization.entity.Organization;
import com.olbl.stickeymain.domain.user.organization.entity.OrganizationStatus;
import com.olbl.stickeymain.domain.user.organization.entity.Player;
import com.olbl.stickeymain.domain.user.organization.repository.OrganizationRepository;
import com.olbl.stickeymain.domain.user.organization.repository.PlayerRepository;
import com.olbl.stickeymain.domain.user.repository.UserRepository;
import com.olbl.stickeymain.global.auth.CustomUserDetails;
import com.olbl.stickeymain.global.result.error.ErrorCode;
import com.olbl.stickeymain.global.result.error.exception.BusinessException;
import com.olbl.stickeymain.global.util.S3Util;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class OrganizationServiceImpl implements OrganizationService {

    private final S3Util s3Util;
    private final BCryptPasswordEncoder passwordEncoder;

    //Repository
    private final OrganizationRepository organizationRepository;
    private final PlayerRepository playerRepository;
    private final SupportRepository supportRepository;
    private final UserRepository userRepository;

    @Override
    @Transactional
    public void signup(OrganSignUpReq organSignUpReq, MultipartFile profile,
        MultipartFile registrationFile) {

        // 프로필 이미지 업로드 (없다면 기본 이미지)
        String profileUrl = "organization/profile/anonymous.png";
        if (profile != null) {
            profileUrl = s3Util.uploadFile(profile, 1);
        }

        // 사업자 등록증 업로드 (없다면 오류 발생)
        if (registrationFile.isEmpty()) {
            throw new BusinessException(ErrorCode.REGISTRATION_FILE_NOT_FOUND);
        }
        String fileUrl = s3Util.uploadFile(registrationFile, 3);

        // 가입 정보 입력
        Organization organization = Organization.builder()
            .name(organSignUpReq.getName())
            .email(organSignUpReq.getEmail())
            .password(passwordEncoder.encode(organSignUpReq.getPassword()))
            .phone(organSignUpReq.getPhone())
            .profileImage(profileUrl)
            .manager(organSignUpReq.getManager())
            .address(organSignUpReq.getAddress())
            .registrationNumber(organSignUpReq.getRegistrationNumber())
            .registrationFile(fileUrl)
            .status(OrganizationStatus.WAITING)
            .role(Role.ORGANIZATION)
            .build();

        // DB 저장
        organizationRepository.save(organization);
    }

    @Override
    public PlayerListRes getPlayers() {
        CustomUserDetails userDetails = (CustomUserDetails) SecurityContextHolder.getContext()
            .getAuthentication().getPrincipal();

        Organization organization = organizationRepository.findById(userDetails.getId())
            .orElseThrow(() -> new BusinessException(ORGANIZATION_DO_NOT_EXISTS));

        List<PlayerRes> playerResList = playerRepository.findAllByOrganizationId(
            organization.getId());
        return new PlayerListRes(playerResList);
    }

    @Override
    @Transactional
    public void registPlayer(PlayerReq playerReq, MultipartFile profile) {
        CustomUserDetails userDetails = (CustomUserDetails) SecurityContextHolder.getContext()
            .getAuthentication().getPrincipal();

        Organization organization = organizationRepository.findById(userDetails.getId())
            .orElseThrow(() -> new BusinessException(ORGANIZATION_DO_NOT_EXISTS));

        //이미지 저장
        String profileUrl = null;
        if (profile != null) {
            profileUrl = s3Util.uploadFile(profile, 2);
        }

        Player player = Player.builder()
            .name(playerReq.getName())
            .birth(playerReq.getBirth())
            .category(playerReq.getCategory())
            .description(playerReq.getDescription())
            .profile(profileUrl)
            .organization(organization)
            .build();

        playerRepository.save(player);
    }

    @Override
    @Transactional
    public void deletePlayer(int id) {
        Player player = playerRepository.findById(id)
            .orElseThrow(() -> new BusinessException(PLAYER_DO_NOT_EXISTS));

        CustomUserDetails userDetails = (CustomUserDetails) SecurityContextHolder.getContext()
            .getAuthentication().getPrincipal();

        Organization organization = organizationRepository.findById(userDetails.getId())
            .orElseThrow(() -> new BusinessException(ORGANIZATION_DO_NOT_EXISTS));

        //해당 player의 소속 기관이 로그인 한 유저와 같은지 확인
        if (organization.getId() != player.getOrganization().getId()) {
            throw new BusinessException(PLAYER_NOT_IN_ORGANIZATION);
        }

        playerRepository.delete(player);
    }

    @Override
    public MySupportListRes getMySupports(Pageable pageable) {
        CustomUserDetails userDetails = (CustomUserDetails) SecurityContextHolder.getContext()
            .getAuthentication().getPrincipal();

        Organization organization = organizationRepository.findById(userDetails.getId())
            .orElseThrow(() -> new BusinessException(ORGANIZATION_DO_NOT_EXISTS));

        Pageable sortedPageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(),
            Sort.by("createTime").descending());

        Slice<MySupportRes> mySupportRes = supportRepository.findAllByOrganizationId(
            organization.getId(), sortedPageable);

        return new MySupportListRes(mySupportRes.getContent(), mySupportRes.getNumber(),
            mySupportRes.getSize(),
            !mySupportRes.hasNext());
    }

    @Override
    public MySupportOneRes getMySupportOne(int id) { // 작성한 후원 글 상세 조회
        MySupportOneRes mySupportOneById = supportRepository.findMySupportOneById(id)
            .orElseThrow(() -> new BusinessException(SUPPORT_DO_NOT_EXISTS));
        return mySupportOneById;
    }

    @Override
    @Transactional
    public void requestRegistSupport(int id, SupportReq supportReq) { // 후원 글 등록 재요청
        CustomUserDetails userDetails = (CustomUserDetails) SecurityContextHolder.getContext()
            .getAuthentication().getPrincipal();

        Support support = supportRepository.findById(id)
            .orElseThrow(() -> new BusinessException(SUPPORT_DO_NOT_EXISTS));

        Organization organization = organizationRepository.findById(userDetails.getId())
            .orElseThrow(() -> new BusinessException(ORGANIZATION_DO_NOT_EXISTS));

        //수정하려는 기관이 해당 후원글을 등록한 기관인지 확인
        if (support.getOrganization().getId() != organization.getId()) {
            throw new BusinessException(SUPPORT_NOT_MATCH);
        }

        //Rejected 상태인지 확인
        if (support.getStatus() != SupportStatus.REJECTED) {
            throw new BusinessException(SUPPORT_DO_NOT_REJECTED);
        }

        support.setTitle(supportReq.getTitle());
        support.setContent(supportReq.getContent());
        support.setStartTime(supportReq.getStartTime());
        support.setEndTime(supportReq.getEndTime());
        support.setStatus(SupportStatus.WAITING); //대기 상태로 변경
        support.setMessage(null);
    }

    @Override
    public OrganizationInfoRes getOrganizationUserInfo() {
        CustomUserDetails userDetails = (CustomUserDetails) SecurityContextHolder.getContext()
            .getAuthentication().getPrincipal();

        OrganizationInfoRes organizationInfoRes = organizationRepository.findOrganizationInfoById(
                userDetails.getId())
            .orElseThrow(() -> new BusinessException(ORGANIZATION_DO_NOT_EXISTS));

        return organizationInfoRes;
    }

    @Override
    @Transactional
    public void modifyOrganizationUserInfo(OrganizationInfoReq organizationInfoReq,
        MultipartFile profile, MultipartFile registrationFile) {
        CustomUserDetails userDetails = (CustomUserDetails) SecurityContextHolder.getContext()
            .getAuthentication().getPrincipal();

        User user = userRepository.findById(userDetails.getId())
            .orElseThrow(() -> new BusinessException(USER_NOT_EXISTS));
        Organization organization = organizationRepository.findById(userDetails.getId())
            .orElseThrow(() -> new BusinessException(ORGANIZATION_DO_NOT_EXISTS));

        if (profile != null && !profile.isEmpty()) {
            String profileUrlBefore = user.getProfileImage();
            String profileUrl = s3Util.uploadFile(profile, 1);

            //TODO: 이전에 있던 사진 삭제 로직 추가
            user.updateProfileImage(profileUrl);
        }

        if (registrationFile != null && !registrationFile.isEmpty()) {
            String fileUrlBefore = organization.getRegistrationFile();
            String fileUrl = s3Util.uploadFile(registrationFile, 3);

            //TODO: 이전에 있던 파일 삭제 로직 추가
            organization.setRegistrationFile(fileUrl);
        }

        organization.updateInfo(organizationInfoReq);
        user.updateUserInfo(organizationInfoReq);
    }
}
