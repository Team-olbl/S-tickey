package com.olbl.stickeymain.domain.user.repository;

import com.olbl.stickeymain.domain.user.dto.ClubInfoDto;
import com.olbl.stickeymain.domain.user.entity.Preference;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PreferenceRepository extends JpaRepository<Preference, Integer> {

    List<ClubInfoDto> findAllByUserId(int id);

}
