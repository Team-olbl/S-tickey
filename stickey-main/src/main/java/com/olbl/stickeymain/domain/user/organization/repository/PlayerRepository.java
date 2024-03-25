package com.olbl.stickeymain.domain.user.organization.repository;

import com.olbl.stickeymain.domain.user.organization.dto.PlayerRes;
import com.olbl.stickeymain.domain.user.organization.entity.Player;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlayerRepository extends JpaRepository<Player, Integer> {

    List<PlayerRes> findAllByOrganizationId(int organizationId);
}
