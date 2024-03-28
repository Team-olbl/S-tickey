package com.olbl.stickeymain.domain.support.dto;

import com.olbl.stickeymain.domain.user.organization.dto.PlayerRes;
import java.time.LocalDateTime;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SupportOneRes {

    private int organizationId;

    private String title;

    private String content;

    private String supportImage;

    private LocalDateTime endTime;

    private LocalDateTime startTime;

    private String profileImage;

    private String name;

    private String email;

    private String phone;

    private String address;

    private String manager;

    private List<PlayerRes> players;
}
