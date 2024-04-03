package com.olbl.stickeymain.domain.game.entity;

import jakarta.persistence.Embeddable;
import java.io.Serializable;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

//복합키
@Embeddable
@NoArgsConstructor
@EqualsAndHashCode
public class StadiumSeatId implements Serializable {

    private int zoneId;
    private int seatId;

    @Builder
    public StadiumSeatId(int zoneId, int seatId) {
        this.zoneId = zoneId;
        this.seatId = seatId;
    }
}
