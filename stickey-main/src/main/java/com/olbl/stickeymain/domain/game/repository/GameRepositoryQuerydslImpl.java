package com.olbl.stickeymain.domain.game.repository;

import static com.olbl.stickeymain.domain.game.entity.QGame.game;

import com.olbl.stickeymain.domain.game.dto.GameListRes;
import com.olbl.stickeymain.domain.game.dto.GameRes;
import com.olbl.stickeymain.domain.game.dto.ViewParam;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.time.LocalDateTime;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
@Slf4j
public class GameRepositoryQuerydslImpl implements GameRepositoryQuerydsl {

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public GameListRes getGameListResByViewParam(ViewParam viewParam) {
        BooleanBuilder booleanBuilder = createBooleanBuilder(viewParam);
        List<GameRes> gameResList = jpaQueryFactory.select(Projections.fields(
                GameRes.class,
                game.id.as("id"),
                game.gameImage,
                game.category,
                game.stadium.id.as("stadiumId"),
                game.stadium.name.as("stadium"),
                game.homeTeam.name.as("homeTeam"),
                game.homeTeam.logo.as("homeTeamLogo"),
                game.awayTeam.name.as("awayTeam"),
                game.awayTeam.logo.as("awayTeamLogo"),
                game.bookStartTime.as("bookStartTime"),
                game.bookEndTime.as("bookEndTime"),
                game.gameStartTime.as("gameStartTime")
            ))
            .from(game)
            .where(booleanBuilder)
            .orderBy(game.bookStartTime.asc())
            .fetch();

        return new GameListRes(gameResList);
    }

    private BooleanBuilder createBooleanBuilder(ViewParam viewParam) {
        BooleanBuilder booleanBuilder = new BooleanBuilder();

        if (viewParam.getClub() != null && !viewParam.getClub().isEmpty()) {
            for (String club : viewParam.getClub()) {
                booleanBuilder.or(game.awayTeam.name.eq(club));
                booleanBuilder.or(game.homeTeam.name.eq(club));
            }
        }
        if (!(viewParam.getDate() == null)) {
            LocalDateTime startOfMonth = viewParam.getDateAsLocalDateTime();
            LocalDateTime endOfMonth = startOfMonth.plusMonths(1).minusSeconds(1);
            booleanBuilder.and(game.bookStartTime.between(startOfMonth, endOfMonth));
        }
        if (!(viewParam.getCatg() == null)) {
            booleanBuilder.and(game.category.eq(viewParam.getCatg()));
        }
        return booleanBuilder;
    }
}
