package com.olbl.stickeymain.domain.game.repository;

import com.olbl.stickeymain.domain.game.dto.SeatStatusRes;
import com.olbl.stickeymain.domain.game.entity.GameSeat;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GameSeatRepository extends JpaRepository<GameSeat, Integer>,
    GameSeatRepositoryQuerydsl {

    Optional<GameSeat> findOneByGameId(int id);

    List<SeatStatusRes> findByGameIdAndZoneId(Integer gameId, Integer zoneId);

    Optional<GameSeat> findGameSeatByGameIdAndZoneIdAndSeatNumber(int gameId, int zoneId,
        int seatNumber);

    List<GameSeat> findByGameId(int gameId);

}
