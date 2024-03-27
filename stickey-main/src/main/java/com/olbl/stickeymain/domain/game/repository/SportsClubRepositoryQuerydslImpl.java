package com.olbl.stickeymain.domain.game.repository;

import static com.olbl.stickeymain.domain.game.entity.QSportsClub.sportsClub;

import com.olbl.stickeymain.domain.game.dto.Param;
import com.olbl.stickeymain.domain.game.dto.SportsClubRes;
import com.olbl.stickeymain.domain.user.entity.QPreference;
import com.olbl.stickeymain.domain.user.entity.QUser;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.CaseBuilder;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.JPAExpressions;
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
    public List<SportsClubRes> getSportsClubByParam(Param param, int id) {
        QPreference preference = QPreference.preference;
        QUser user = QUser.user;

        BooleanBuilder booleanBuilder = createBooleanBuilder(param);
        List<SportsClubRes> sportsClubList = jpaQueryFactory.select(Projections.fields(
                SportsClubRes.class,
                sportsClub.id,
                sportsClub.logo,
                sportsClub.category,
                sportsClub.name,
                new CaseBuilder().when(
                        Expressions.asBoolean(
                            JPAExpressions.select(preference.sportsClub.id)
                                .from(preference)
                                .where(
                                    preference.user.id.eq(id),
                                    preference.sportsClub.id.eq(sportsClub.id)
                                ).exists())
                    )
                    .then(1)
                    .otherwise(0)
                    .as("isPrefer")
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
