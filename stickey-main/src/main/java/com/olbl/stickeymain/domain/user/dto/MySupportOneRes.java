package com.olbl.stickeymain.domain.user.dto;

import com.olbl.stickeymain.domain.support.entity.SupportStatus;
import java.time.LocalDateTime;

public interface MySupportOneRes {

    String getTitle();

    String getContent();

    LocalDateTime getStartTime();

    LocalDateTime getEndTime();

    String getMessage();

    String getSupportImage();

    SupportStatus getStatus();

}
