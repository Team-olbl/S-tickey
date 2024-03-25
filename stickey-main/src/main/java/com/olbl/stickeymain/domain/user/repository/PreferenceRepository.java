package com.olbl.stickeymain.domain.user.repository;

import com.olbl.stickeymain.domain.user.entity.Preference;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

public interface PreferenceRepository extends JpaRepository<Preference, Integer> {

    @Transactional
    @Modifying
    @Query("DELETE FROM Preference p WHERE p.user.id = :userId")
    void deleteAllByUserId(int userId);
}
