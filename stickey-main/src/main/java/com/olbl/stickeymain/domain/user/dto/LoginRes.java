package com.olbl.stickeymain.domain.user.dto;

import com.olbl.stickeymain.domain.user.entity.User;
import java.util.List;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginRes {

    // 회원 PK
    int id;

    // 회원명
    String name;

    // 이메일
    String email;

    // 전화번호
    String phone;

    // 프로필 이미지
    String profile;

    // 선호 구단
    List<ClubInfoDto> preferences;

    @Builder
    public LoginRes(User user, List<ClubInfoDto> preferences) {
        this.id = user.getId();
        this.name = user.getName();
        this.email = user.getEmail();
        this.phone = user.getPhone();
        this.profile = user.getProfileImage();
        this.preferences = preferences;
    }
}
