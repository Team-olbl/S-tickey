package com.olbl.stickeymain.domain.user.organization.service;

import static com.olbl.stickeymain.global.result.error.ErrorCode.ORGANIZATION_DO_NOT_EXISTS;
import static com.olbl.stickeymain.global.result.error.ErrorCode.PLAYER_DO_NOT_EXISTS;
import static com.olbl.stickeymain.global.result.error.ErrorCode.SUPPORT_DO_NOT_EXISTS;

import com.olbl.stickeymain.domain.support.repository.SupportRepository;
import com.olbl.stickeymain.domain.user.dto.MySupportListRes;
import com.olbl.stickeymain.domain.user.dto.MySupportRes;
import com.olbl.stickeymain.domain.user.dto.MySupportOneRes;
import com.olbl.stickeymain.domain.user.entity.Role;
import com.olbl.stickeymain.domain.user.organization.dto.OrganSignUpReq;
import com.olbl.stickeymain.domain.user.organization.dto.PlayerListRes;
import com.olbl.stickeymain.domain.user.organization.dto.PlayerReq;
import com.olbl.stickeymain.domain.user.organization.dto.PlayerRes;
import com.olbl.stickeymain.domain.user.organization.entity.Organization;
import com.olbl.stickeymain.domain.user.organization.entity.OrganizationStatus;
import com.olbl.stickeymain.domain.user.organization.entity.Player;
import com.olbl.stickeymain.domain.user.organization.repository.OrganizationRepository;
import com.olbl.stickeymain.domain.user.organization.repository.PlayerRepository;
import com.olbl.stickeymain.global.result.error.ErrorCode;
import com.olbl.stickeymain.global.result.error.exception.BusinessException;
import com.olbl.stickeymain.global.util.S3Util;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.Sort;
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
        //TODO: 로그인 한 정보에서 organization id 가져오기
        int organizationId = 1;
        List<PlayerRes> playerResList = playerRepository.findAllByOrganizationId(organizationId);
        return new PlayerListRes(playerResList);
    }

    @Override
    @Transactional
    public void registPlayer(PlayerReq playerReq, MultipartFile profile) {
        //TODO: 로그인 한 정보에서 organization id 가져오기
        int id = 1;
        Organization organization = organizationRepository.findById(id)
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
        //TODO: 해당 player의 소속 기관이 로그인 한 유저와 같은지 확인하는 로직
        playerRepository.delete(player);
    }

    @Override
    public MySupportListRes getMySupports(Pageable pageable) {
        //TODO: 토큰에서 기업 id 가져오기
        int id = 1;
        Organization organization = organizationRepository.findById(id)
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
    public MySupportOneRes getMySupportOne(int id) {
        MySupportOneRes mySupportOneById = supportRepository.findMySupportOneById(id)
            .orElseThrow(() -> new BusinessException(SUPPORT_DO_NOT_EXISTS));
        return mySupportOneById;
    }
}
