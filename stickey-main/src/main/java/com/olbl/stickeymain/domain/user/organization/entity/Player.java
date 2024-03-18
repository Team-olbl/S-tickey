package com.olbl.stickeymain.domain.user.organization.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import java.time.LocalDate;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class Player {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id; //선수 식별ID
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "organization_id")
    private Organization organization; //소속 단체
    private String name; //선수명
    private String profile; //선수 프로필 이미지
    private String description; //설명
    private String category; //종목
    private LocalDate birth; //생년월일

    @Builder
    public Player(Organization organization, String name, String profile, String description,
        String category, LocalDate birth) {
        this.organization = organization;
        this.name = name;
        this.profile = profile;
        this.description = description;
        this.category = category;
        this.birth = birth;
    }
}
