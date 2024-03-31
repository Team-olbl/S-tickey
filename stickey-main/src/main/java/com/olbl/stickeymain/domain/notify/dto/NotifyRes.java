package com.olbl.stickeymain.domain.notify.dto;

import com.olbl.stickeymain.domain.notify.entity.NotificationType;
import com.olbl.stickeymain.domain.notify.entity.Notify;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class NotifyRes {

    private int eventId;

    private int userId;

    private NotificationType notificationType;

    private String content;

    private LocalDateTime createdAt;

    public static NotifyRes createResponse(Notify notify) {
        return NotifyRes.builder()
            .notificationType(notify.getNotificationType())
            .content(notify.getContent())
            .userId(notify.getReceiver().getId())
            .createdAt(notify.getCreatedAt())
            .build();
    }
}
