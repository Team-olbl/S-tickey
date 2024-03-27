package com.olbl.stickeymain.domain.game.repository;

import static com.olbl.stickeymain.domain.game.entity.QGameSeat.gameSeat;

import com.olbl.stickeymain.domain.game.dto.LeftSeatListRes;
import com.olbl.stickeymain.domain.game.dto.LeftSeatRes;
import com.olbl.stickeymain.domain.game.entity.SeatStatus;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.CaseBuilder;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
@Slf4j
public class GameSeatRepositoryQuerydslImpl implements GameSeatRepositoryQuerydsl {

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public LeftSeatListRes getLeftSeatListResByGameId(int id) {
        List<LeftSeatRes> gameSeatList = jpaQueryFactory.select(Projections.fields(
                LeftSeatRes.class,
                gameSeat.count().as("totalSeatCnt"),
                new CaseBuilder()
                    .when(gameSeat.status.eq(SeatStatus.AVAILABLE))
                    .then(1L)
                    .otherwise(0L)
                    .sum()
                    .as("leftSeatCnt"),
                gameSeat.zoneName,
                gameSeat.zoneId,
                gameSeat.price
            ))
            .from(gameSeat)
            .where(gameSeat.game.id.eq(id))
            .groupBy(gameSeat.zoneName, gameSeat.zoneId, gameSeat.price)
            .fetch();

        return new LeftSeatListRes(gameSeatList);
    }
}
