package com.olbl.stickeymain.domain.game.repository;

import com.olbl.stickeymain.domain.game.entity.SportsClub;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SportsClubRepository extends JpaRepository<SportsClub, Integer>,
    SportsClubRepositoryQuerydsl {

    Optional<SportsClub> findSportsClubByName(String name);
}
