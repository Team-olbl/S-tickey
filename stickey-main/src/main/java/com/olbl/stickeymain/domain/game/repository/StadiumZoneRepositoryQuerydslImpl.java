package com.olbl.stickeymain.domain.game.repository;

import com.olbl.stickeymain.domain.game.dto.ZoneDto;
import com.olbl.stickeymain.domain.game.entity.QStadiumZone;
import com.querydsl.core.group.GroupBy;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
@Slf4j
public class StadiumZoneRepositoryQuerydslImpl implements StadiumZoneRepositoryQuerydsl {

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public Map<Integer, ZoneDto> findZoneByStadiumIdAndMap(int stadiumId) {
        QStadiumZone stadiumZone = QStadiumZone.stadiumZone;

        Map<Integer, ZoneDto> map = jpaQueryFactory
            .selectFrom(stadiumZone)
            .where(stadiumZone.stadium.id.eq(stadiumId))
            .transform(GroupBy.groupBy(stadiumZone.id).as(Projections.fields(ZoneDto.class,
                stadiumZone.name,
                stadiumZone.price
            )));

        return map;
    }
}
