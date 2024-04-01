package com.olbl.stickeymain.domain.game.repository;

import com.olbl.stickeymain.domain.game.entity.StadiumSeat;
import com.olbl.stickeymain.domain.game.entity.StadiumSeatId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StadiumSeatRepository extends JpaRepository<StadiumSeat, StadiumSeatId>,
    StadiumSeatRepositoryQuerydsl {

}
