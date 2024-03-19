package com.olbl.stickeymain.domain.game.repository;

import com.olbl.stickeymain.domain.game.entity.Stadium;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StadiumRepository extends JpaRepository<Stadium, Integer> {

    Optional<Stadium> findStadiumById(int id);
}
