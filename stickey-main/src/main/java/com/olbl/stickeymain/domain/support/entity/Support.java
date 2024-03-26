package com.olbl.stickeymain.domain.support.entity;

import com.olbl.stickeymain.domain.user.organization.entity.Organization;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@Getter
@Setter
@NoArgsConstructor
@EntityListeners(value = AuditingEntityListener.class)
public class Support {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "organization_id")
    private Organization organization;
    private String title;
    private String content;
    @CreatedDate
    private LocalDateTime createTime; //글 생성 시간
    private LocalDateTime startTime; //후원 시작일
    private LocalDateTime endTime; //후원 마감일
    @Enumerated(EnumType.STRING)
    private SupportStatus status;
    private String supportImage; // 후원 글 첨부 사진
    private String message; // 승인 거절 메시지

    @Builder
    public Support(Organization organization, String title, String content, LocalDateTime startTime,
        LocalDateTime endTime, SupportStatus status, String supportImage) {
        this.organization = organization;
        this.title = title;
        this.content = content;
        this.startTime = startTime;
        this.endTime = endTime;
        this.status = status;
        this.supportImage = supportImage;
    }
}
