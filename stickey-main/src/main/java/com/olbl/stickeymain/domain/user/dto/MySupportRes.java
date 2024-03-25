package com.olbl.stickeymain.domain.user.dto;

import com.olbl.stickeymain.domain.support.entity.SupportStatus;
import java.time.LocalDateTime;


public interface MySupportRes {

    int getId();

    String getTitle();

    String getContent();

    LocalDateTime getCreateTime(); //글 생성 시간

    LocalDateTime getStartTime(); //후원 시작일

    LocalDateTime getEndTime(); //후원 마감일

    SupportStatus getStatus();

    String getSupportImage(); // 후원 글 첨부 사진

}
