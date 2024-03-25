package com.olbl.stickeymain.domain.support.dto;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SupportRes {

    private int id;

    private String title;

    private String content;

    private LocalDateTime startTime;

    private LocalDateTime endTime;

    private String supportImage;

    private String organizationName;

    private String profileImage;

}
