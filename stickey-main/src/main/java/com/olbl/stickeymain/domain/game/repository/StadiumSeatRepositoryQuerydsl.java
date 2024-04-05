package com.olbl.stickeymain.domain.game.repository;

import java.util.List;
import java.util.Map;

public interface StadiumSeatRepositoryQuerydsl {

    Map<Integer, Long> findSeatCountsGroupByZoneId(List<Integer> zoneIds);
}
