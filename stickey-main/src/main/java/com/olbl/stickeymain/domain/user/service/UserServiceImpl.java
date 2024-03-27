package com.olbl.stickeymain.domain.user.service;

import static com.olbl.stickeymain.global.result.error.ErrorCode.EMAIL_VERIFICATION_INVAID;
import static com.olbl.stickeymain.global.result.error.ErrorCode.EMAIL_VERIFICATION_NOT_EXISTS;
import static com.olbl.stickeymain.global.result.error.ErrorCode.ORGANIZATION_DO_NOT_EXISTS;
import static com.olbl.stickeymain.global.result.error.ErrorCode.SPORTS_CLUB_DO_NOT_EXISTS;
import static com.olbl.stickeymain.global.result.error.ErrorCode.USER_NOT_EXISTS;

import com.olbl.stickeymain.domain.game.entity.SportsClub;
import com.olbl.stickeymain.domain.game.repository.SportsClubRepository;
import com.olbl.stickeymain.domain.user.dto.ClubInfoDto;
import com.olbl.stickeymain.domain.user.dto.EmailCheckReq;
import com.olbl.stickeymain.domain.user.dto.EmailCodeReq;
import com.olbl.stickeymain.domain.user.dto.PreferenceReq;
import com.olbl.stickeymain.domain.user.dto.ProfileRes;
import com.olbl.stickeymain.domain.user.dto.SignUpReq;
import com.olbl.stickeymain.domain.user.entity.Preference;
import com.olbl.stickeymain.domain.user.entity.Role;
import com.olbl.stickeymain.domain.user.entity.User;
import com.olbl.stickeymain.domain.user.organization.entity.Organization;
import com.olbl.stickeymain.domain.user.organization.entity.OrganizationStatus;
import com.olbl.stickeymain.domain.user.organization.repository.OrganizationRepository;
import com.olbl.stickeymain.domain.user.repository.PreferenceRepository;
import com.olbl.stickeymain.domain.user.repository.UserRepository;
import com.olbl.stickeymain.global.auth.CustomUserDetails;
import com.olbl.stickeymain.global.result.error.exception.BusinessException;
import com.olbl.stickeymain.global.util.S3Util;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserServiceImpl implements UserService {

    //Repository
    private final UserRepository userRepository;
    private final PreferenceRepository preferenceRepository;
    private final SportsClubRepository sportsClubRepository;
    private final OrganizationRepository organizationRepository;

    //Util
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final S3Util s3Util;
    private final RedisTemplate redisTemplate;


    @Override
    @Transactional
    public void signup(SignUpReq userJoinReq, MultipartFile profile) {
        // 프로필 이미지 업로드 (없다면 기본 이미지)
        String fileUrl = "individual/profile/anonymous.png";
        if (profile != null) {
            fileUrl = s3Util.uploadFile(profile, 0);
        }

        // 가입 정보 입력
        User user = User.builder()
            .name(userJoinReq.getName())
            .email(userJoinReq.getEmail())
            .password(bCryptPasswordEncoder.encode(userJoinReq.getPassword()))
            .phone(userJoinReq.getPhone())
            .profileImage(fileUrl)
            .role(Role.INDIVIDUAL)
            .build();

        // DB 저장
        userRepository.save(user);
    }

    // 인증 코드 확인
    @Override
    public boolean checkAuthEmail(EmailCheckReq emailCheckReq) {
        // 유효한 인증 코드가 있는지 확인
        if (!redisTemplate.opsForHash().hasKey("emailAuth", emailCheckReq.getEmail())) {
            throw new BusinessException(EMAIL_VERIFICATION_NOT_EXISTS);
        }

        // 인증 코드의 일치 여부 확인
        String code = (String) redisTemplate.opsForHash()
            .get("emailAuth", emailCheckReq.getEmail());
        if (!code.equals(emailCheckReq.getAuthCode())) {
            throw new BusinessException(EMAIL_VERIFICATION_INVAID);
        }
        return true;
    }

    @Override
    @Transactional
    public String findPassword(EmailCodeReq emailCodeReq) {
        // 회원이 존재하는지 확인
        User user = userRepository.findByEmail(emailCodeReq.getEmail())
            .orElseThrow(() -> new BusinessException(USER_NOT_EXISTS));

        // 임시 비밀번호 생성
        StringBuilder newPassword = new StringBuilder();
        Random random = new Random();
        for (int i = 0; i < 15; i++) {
            int idx = random.nextInt(3);

            switch (idx) {
                case 0: // 영어 소문자
                    newPassword.append((char) (random.nextInt(26) + 97));
                    break;
                case 1: // 영어 대문자
                    newPassword.append((char) (random.nextInt(26) + 65));
                    break;
                default: // 숫자
                    newPassword.append(random.nextInt(10));
            }
        }

        user.changePassword(newPassword.toString());
        return newPassword.toString();
    }

    @Override
    public ProfileRes getProfile(Authentication authentication) {
        //프로필 조회 확인
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        User user = userRepository.findById(userDetails.getId())
            .orElseThrow(() -> new BusinessException(USER_NOT_EXISTS));

        List<ClubInfoDto> preference = new ArrayList<>();
        OrganizationStatus status = null;

        if (user.getRole().equals(Role.INDIVIDUAL)) { //개인 계정
            preference = preferenceRepository.findAllByUserId(user.getId());
        } else if (user.getRole().equals(Role.ORGANIZATION)) { //기관 계정
            Organization organization = organizationRepository.findById(userDetails.getId())
                .orElseThrow(() -> new BusinessException(ORGANIZATION_DO_NOT_EXISTS));
            status = organization.getStatus();
        }

        ProfileRes profileRes = ProfileRes.builder()
            .role(user.getRole())
            .status(status)
            .profileImage(user.getProfileImage())
            .name(user.getName())
            .preference(preference).
            build();

        return profileRes;
    }

    @Override
    @Transactional
    public void modifyPreference(PreferenceReq preferenceReq, Authentication authentication) {
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        User user = userRepository.findById(userDetails.getId())
            .orElseThrow(() -> new BusinessException(USER_NOT_EXISTS));

        //기존 정보 한번에 삭제
        preferenceRepository.deleteAllByUserId(user.getId());
        // PreferenceReq로부터 새로운 Preference 리스트 생성
        List<Preference> newPreferences = preferenceReq.getPreferences().stream()
            .map(sportsClubId -> {
                SportsClub sportsClub = sportsClubRepository.findById(sportsClubId)
                    .orElseThrow(() -> new BusinessException(SPORTS_CLUB_DO_NOT_EXISTS));
                return Preference.builder()
                    .user(user)
                    .sportsClub(sportsClub)
                    .build();
            }).collect(Collectors.toList());

        // User에 새로운 Preference 리스트 설정
        user.changePreferences(newPreferences);
    }
}
