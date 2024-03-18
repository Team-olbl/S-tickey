package com.olbl.stickeymain.domain.reservation.entity;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class StadiumSeat {

    @EmbeddedId
    private StadiumSeatId id;

    @MapsId("zoneId")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "zone_id")
    private StadiumZone stadiumZone; // 구역

    @Builder
    public StadiumSeat(StadiumSeatId id, StadiumZone stadiumZone) {
        this.id = id;
        this.stadiumZone = stadiumZone;
    }
}
