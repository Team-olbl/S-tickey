package com.olbl.stickeymain.domain.game.repository;

import com.olbl.stickeymain.domain.game.entity.QStadiumSeat;
import com.querydsl.core.group.GroupBy;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
@Slf4j
public class StadiumSeatRepositoryQuerydslImpl implements StadiumSeatRepositoryQuerydsl {

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public Map<Integer, Long> findSeatCountsGroupByZoneId(List<Integer> zoneIds) {
        QStadiumSeat stadiumSeat = QStadiumSeat.stadiumSeat;

        Map<Integer, Long> map = jpaQueryFactory
            .from(stadiumSeat)
            .where(stadiumSeat.stadiumZone.id.in(zoneIds))
            .groupBy(stadiumSeat.stadiumZone.id)
            .transform(GroupBy.groupBy(stadiumSeat.stadiumZone.id).as(stadiumSeat.id.count()));

        return map;
    }
}
