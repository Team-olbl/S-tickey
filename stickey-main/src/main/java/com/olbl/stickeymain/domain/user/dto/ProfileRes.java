package com.olbl.stickeymain.domain.user.dto;

import com.olbl.stickeymain.domain.user.entity.Role;
import com.olbl.stickeymain.domain.user.organization.entity.OrganizationStatus;
import java.util.List;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProfileRes {

    private Role role; // 권한 값
    private OrganizationStatus status; //기관 상태값
    private String profileImage; //프로필 이미지
    private String name; //회원 이름, 단체 이름
    private List<ClubInfoDto> preference; //선호 구단 리스트

    @Builder
    public ProfileRes(Role role, OrganizationStatus status, String profileImage, String name,
        List<ClubInfoDto> preference) {
        this.role = role;
        this.status = status;
        this.profileImage = profileImage;
        this.name = name;
        this.preference = preference;
    }
}
