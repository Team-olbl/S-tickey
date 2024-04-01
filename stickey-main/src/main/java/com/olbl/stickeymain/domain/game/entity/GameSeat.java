package com.olbl.stickeymain.domain.game.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class GameSeat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "game_id")
    private Game game;
    private int zoneId;
    private String zoneName;
    private int seatNumber;
    @Enumerated(EnumType.STRING)
    private SeatStatus status;
    private int price;

    @Builder
    public GameSeat(Game game, int zoneId, String zoneName, int seatNumber, SeatStatus status,
        int price) {
        this.game = game;
        this.zoneId = zoneId;
        this.zoneName = zoneName;
        this.seatNumber = seatNumber;
        this.status = status;
        this.price = price;
    }

    public void changeStatus(SeatStatus seatStatus) {
        this.status = seatStatus;
    }
}
