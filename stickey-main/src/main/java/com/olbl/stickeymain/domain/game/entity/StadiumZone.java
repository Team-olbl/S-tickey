package com.olbl.stickeymain.domain.game.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class StadiumZone {

    @OneToMany(mappedBy = "stadiumZone", cascade = CascadeType.REMOVE)
    List<StadiumSeat> seats = new ArrayList<>(); // 좌석 리스트
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id; // 구역 ID
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "stadium_id")
    private Stadium stadium; // 경기장
    private String name; // 구역명
    private int price; // 가격

    @Builder
    public StadiumZone(Stadium stadium, String name, int price) {
        this.stadium = stadium;
        this.name = name;
        this.price = price;
    }

}
