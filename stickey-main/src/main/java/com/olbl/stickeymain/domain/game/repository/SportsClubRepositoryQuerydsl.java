package com.olbl.stickeymain.domain.game.repository;

import com.olbl.stickeymain.domain.game.dto.Param;
import com.olbl.stickeymain.domain.game.dto.SportsClubRes;
import java.util.List;

public interface SportsClubRepositoryQuerydsl {

    List<SportsClubRes> getSportsClubByParam(Param param, int id);
}
