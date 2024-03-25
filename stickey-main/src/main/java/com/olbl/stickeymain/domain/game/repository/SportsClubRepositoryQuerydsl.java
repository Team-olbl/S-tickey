package com.olbl.stickeymain.domain.game.repository;

import com.olbl.stickeymain.domain.game.dto.Param;
import com.olbl.stickeymain.domain.game.entity.SportsClub;
import java.util.List;

public interface SportsClubRepositoryQuerydsl {

    List<SportsClub> getSportsClubByParam(Param param);
}
