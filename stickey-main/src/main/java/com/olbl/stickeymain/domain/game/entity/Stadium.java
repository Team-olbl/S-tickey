package com.olbl.stickeymain.domain.game.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class Stadium {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id; //경기장 ID
    private String name; //경기장 이름
    private String region; //지역
    @OneToMany(mappedBy = "stadium", cascade = CascadeType.REMOVE)
    private List<StadiumZone> zones = new ArrayList<>(); //구역 리스트

    @Builder
    public Stadium(String name, String region) {
        this.name = name;
        this.region = region;
    }

}