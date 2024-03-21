package com.olbl.stickeymain.domain.game.repository;

import com.olbl.stickeymain.domain.game.entity.GameSeat;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GameSeatRepository extends JpaRepository<GameSeat, Integer>,
    GameSeatRepositoryQuerydsl {

}
