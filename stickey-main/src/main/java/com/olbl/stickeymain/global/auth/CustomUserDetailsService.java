package com.olbl.stickeymain.global.auth;

import com.olbl.stickeymain.domain.user.entity.User;
import com.olbl.stickeymain.domain.user.organization.repository.OrganizationRepository;
import com.olbl.stickeymain.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;
    private final OrganizationRepository organizationRepository;

    // DB에서 유저 정보를 불러와 UserDetails로 리턴
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        // DB 조회
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("이메일이 존재하지 않습니다."));

        // UserDetails에 담아 반환하면 AuthenticationManager가 회원검증을 수행한다
        return new CustomUserDetails(user);
    }

}
