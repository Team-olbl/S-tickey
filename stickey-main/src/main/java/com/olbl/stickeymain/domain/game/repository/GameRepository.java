package com.olbl.stickeymain.domain.game.repository;

import com.olbl.stickeymain.domain.game.entity.Game;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GameRepository extends JpaRepository<Game, Integer>, GameRepositoryQuerydsl {

    List<Game> findByBookStartTimeBetween(LocalDateTime now, LocalDateTime twentyMinutesFromNow);

    List<Game> findByGameStartTimeBetween(LocalDateTime startOfTomorrow,
        LocalDateTime endOfTomorrow);
}
