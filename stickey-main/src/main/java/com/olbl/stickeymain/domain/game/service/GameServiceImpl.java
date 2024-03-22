package com.olbl.stickeymain.domain.game.service;

import static com.olbl.stickeymain.global.result.error.ErrorCode.GAME_DO_NOT_EXISTS;
import static com.olbl.stickeymain.global.result.error.ErrorCode.SPORTS_CLUB_DO_NOT_EXISTS;
import static com.olbl.stickeymain.global.result.error.ErrorCode.STADIUM_DO_NOT_EXISTS;
import static com.olbl.stickeymain.global.result.error.ErrorCode.STADIUM_ZONE_DO_NOT_EXISTS;

import com.olbl.stickeymain.domain.game.dto.GameListRes;
import com.olbl.stickeymain.domain.game.dto.GameReq;
import com.olbl.stickeymain.domain.game.dto.LeftSeatListRes;
import com.olbl.stickeymain.domain.game.dto.SeatStatusRes;
import com.olbl.stickeymain.domain.game.dto.ViewParam;
import com.olbl.stickeymain.domain.game.entity.Category;
import com.olbl.stickeymain.domain.game.entity.Game;
import com.olbl.stickeymain.domain.game.entity.GameSeat;
import com.olbl.stickeymain.domain.game.entity.SportsClub;
import com.olbl.stickeymain.domain.game.entity.Stadium;
import com.olbl.stickeymain.domain.game.entity.StadiumZone;
import com.olbl.stickeymain.domain.game.repository.GameRepository;
import com.olbl.stickeymain.domain.game.repository.GameSeatRepository;
import com.olbl.stickeymain.domain.game.repository.SportsClubRepository;
import com.olbl.stickeymain.domain.game.repository.StadiumRepository;
import com.olbl.stickeymain.domain.game.repository.StadiumZoneRepository;
import com.olbl.stickeymain.global.result.error.exception.BusinessException;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class GameServiceImpl implements GameService {

    //Repository
    private final GameRepository gameRepository;
    private final SportsClubRepository sportsClubRepository;
    private final StadiumRepository stadiumRepository;
    private final GameSeatRepository gameSeatRepository;
    private final StadiumZoneRepository stadiumZoneRepository;

    @Override
    @Transactional
    public void registGame(GameReq gameReq) {
        SportsClub homeTeam = sportsClubRepository.findSportsClubByName(gameReq.getHomeTeamName())
            .orElseThrow(() -> new BusinessException(SPORTS_CLUB_DO_NOT_EXISTS));
        SportsClub awayTeam = sportsClubRepository.findSportsClubByName(gameReq.getAwayTeamName())
            .orElseThrow(() -> new BusinessException(SPORTS_CLUB_DO_NOT_EXISTS));
        Stadium stadium = stadiumRepository.findStadiumById(gameReq.getStadiumId())
            .orElseThrow(() -> new BusinessException(STADIUM_DO_NOT_EXISTS));

        //TODO: gameImage (경기 포스터) 업로드 코드 작성

        Game game = Game.builder()
            .stadium(stadium)
            .homeTeam(homeTeam)
            .awayTeam(awayTeam)
            .category(Category.valueOf(gameReq.getCategory()))
            .gameStartTime(gameReq.getGameStartTime())
            .bookStartTime(gameReq.getBookStartTime())
            .bookEndTime(gameReq.getBookEndTime())
            .build();

        gameRepository.save(game);
    }

    @Override
    public GameListRes getGames(ViewParam viewParam) {
        List<String> clubs = viewParam.getClub();
        if (viewParam.getClub() != null && !viewParam.getClub().isEmpty()) {
            for (String clubName : clubs) { //param에 들어온 구단 명이 존재하는지 검증
                sportsClubRepository.findSportsClubByName(clubName)
                    .orElseThrow(() -> new BusinessException(SPORTS_CLUB_DO_NOT_EXISTS));
            }
        }
        return gameRepository.getGameListResByViewParam(viewParam);
    }

    @Override
    public LeftSeatListRes getLeftSeats(int id) {
        Game game = gameRepository.findById(id)
            .orElseThrow(() -> new BusinessException(GAME_DO_NOT_EXISTS)); //game id 있는지 확인
        return gameSeatRepository.getLeftSeatListResByGameId(id);
    }

    @Override
    public List<SeatStatusRes> getSeatStatus(int id, int zoneId) {
        GameSeat gameSeat = gameSeatRepository.findOneByGameId(id)
            .orElseThrow(() -> new BusinessException(GAME_DO_NOT_EXISTS)); //game id 있는지 확인
        StadiumZone stadiumZone = stadiumZoneRepository.findById(zoneId)
            .orElseThrow(() -> new BusinessException(STADIUM_ZONE_DO_NOT_EXISTS)); // zone id 있는지 확인

        return gameSeatRepository.findByGameIdAndZoneId(id, zoneId);
    }
}
