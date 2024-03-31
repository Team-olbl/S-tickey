package com.olbl.stickeymain.domain.game.repository;

import com.olbl.stickeymain.domain.game.dto.ZoneDto;
import java.util.Map;

public interface StadiumZoneRepositoryQuerydsl {

    Map<Integer, ZoneDto> findZoneByStadiumIdAndMap(int stadiumId);

}
