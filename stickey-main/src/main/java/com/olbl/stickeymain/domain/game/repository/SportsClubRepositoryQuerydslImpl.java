package com.olbl.stickeymain.domain.game.repository;

import static com.olbl.stickeymain.domain.game.entity.QSportsClub.sportsClub;

import com.olbl.stickeymain.domain.game.dto.Param;
import com.olbl.stickeymain.domain.game.entity.SportsClub;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
@Slf4j
public class SportsClubRepositoryQuerydslImpl implements SportsClubRepositoryQuerydsl {

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public List<SportsClub> getSportsClubByParam(Param param) {
        BooleanBuilder booleanBuilder = createBooleanBuilder(param);
        List<SportsClub> sportsClubList = jpaQueryFactory.select(Projections.fields(
                SportsClub.class,
                sportsClub.id,
                sportsClub.logo,
                sportsClub.category,
                sportsClub.name
            ))
            .from(sportsClub)
            .where(booleanBuilder)
            .orderBy(sportsClub.id.asc())
            .fetch();

        return sportsClubList;
    }

    private BooleanBuilder createBooleanBuilder(Param param) {
        BooleanBuilder booleanBuilder = new BooleanBuilder();

        if (!(param.getCatg() == null)) {
            booleanBuilder.and(sportsClub.category.eq(param.getCatg()));
        }
        return booleanBuilder;
    }
}
