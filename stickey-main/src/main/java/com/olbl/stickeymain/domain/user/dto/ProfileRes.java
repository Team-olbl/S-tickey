package com.olbl.stickeymain.domain.user.dto;

import java.util.List;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProfileRes {

    private String profileImage; //프로필 이미지
    private String name; //회원 이름, 단체 이름
    private List<ClubInfoDto> preference; //선호 구단 리스트

    @Builder
    public ProfileRes(String profileImage, String name, List<ClubInfoDto> preference) {
        this.profileImage = profileImage;
        this.name = name;
        this.preference = preference;
    }
}
