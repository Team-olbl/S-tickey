package com.olbl.stickeymain.global.auth;

import com.olbl.stickeymain.domain.user.entity.User;
import java.util.ArrayList;
import java.util.Collection;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

@RequiredArgsConstructor
public class CustomUserDetails implements UserDetails {

    private final User user;

    // 계정의 권한 목록 리턴
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Collection<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(
            new SimpleGrantedAuthority("ROLE_" + user.getRole().toString())); // ENUM 타입으로 권한 관리
        return authorities;
    }

    // 계정의 비밀번호 리턴
    @Override
    public String getPassword() {
        return user.getPassword();
    }

    // 계정의 고유한 값 리턴
    @Override
    public String getUsername() {
        return String.valueOf(user.getId());
    }

    // 계정의 ID 값 리턴
    public int getId() {
        return user.getId();
    }

    // 계정의 만료 여부 리턴
    @Override
    public boolean isAccountNonExpired() {
        return true; // 만료 안됨
    }


    // 계정의 잠김 여부 리턴
    @Override
    public boolean isAccountNonLocked() {
        return true; // 잠기지 않음
    }

    // 비밀번호 만료 여부 리턴
    @Override
    public boolean isCredentialsNonExpired() {
        return true; // 만료되지 않음
    }

    // 계정 활성화 여부 리턴
    @Override
    public boolean isEnabled() {
        return true; // 활성화 됨
    }

}
