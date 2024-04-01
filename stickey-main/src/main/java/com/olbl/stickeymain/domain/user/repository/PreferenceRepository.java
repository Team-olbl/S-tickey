package com.olbl.stickeymain.domain.user.repository;

import com.olbl.stickeymain.domain.game.entity.SportsClub;
import com.olbl.stickeymain.domain.user.dto.ClubInfoDto;
import com.olbl.stickeymain.domain.user.entity.Preference;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

public interface PreferenceRepository extends JpaRepository<Preference, Integer> {

    @Transactional
    @Modifying
    @Query("DELETE FROM Preference p WHERE p.user.id = :userId")
    void deleteAllByUserId(int userId);

    List<ClubInfoDto> findAllByUserId(int id);

    List<Preference> findBySportsClubIn(List<SportsClub> sportsClub);
}
