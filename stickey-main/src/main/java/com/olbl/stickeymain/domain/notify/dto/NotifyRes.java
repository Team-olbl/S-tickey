package com.olbl.stickeymain.domain.notify.dto;

import com.olbl.stickeymain.domain.notify.entity.NotificationType;
import com.olbl.stickeymain.domain.notify.entity.Notify;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class NotifyRes {

    private int id;

    private int userId;

    private NotificationType notificationType;

    private String content;

    private LocalDateTime createdAt;

    public static Notify createResponse(Notify notify) {
        return Notify.builder()
            .content(notify.getContent())
            .id(notify.getId())
            .id(notify.getReceiver().getId())
            .createdAt(notify.getCreatedAt())
            .build();
    }
}
