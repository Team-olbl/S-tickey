package com.olbl.stickeymain.domain.game.repository;

import com.olbl.stickeymain.domain.game.entity.StadiumZone;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StadiumZoneRepository extends JpaRepository<StadiumZone, Integer>,
    StadiumZoneRepositoryQuerydsl {

    List<StadiumZone> findAllByStadiumId(int id);

}
