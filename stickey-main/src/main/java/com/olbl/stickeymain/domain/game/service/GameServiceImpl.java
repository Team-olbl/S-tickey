package com.olbl.stickeymain.domain.game.service;

import static com.olbl.stickeymain.global.result.error.ErrorCode.FORBIDDEN_ERROR;
import static com.olbl.stickeymain.global.result.error.ErrorCode.GAME_DO_NOT_EXISTS;
import static com.olbl.stickeymain.global.result.error.ErrorCode.GAME_NOT_IN_RESERVATOIN_PROGRESS;
import static com.olbl.stickeymain.global.result.error.ErrorCode.HOLDING_TIME_OVER;
import static com.olbl.stickeymain.global.result.error.ErrorCode.SPORTS_CLUB_DO_NOT_EXISTS;
import static com.olbl.stickeymain.global.result.error.ErrorCode.STADIUM_DO_NOT_EXISTS;
import static com.olbl.stickeymain.global.result.error.ErrorCode.STADIUM_ZONE_DO_NOT_EXISTS;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.olbl.stickeymain.domain.game.dto.GameListRes;
import com.olbl.stickeymain.domain.game.dto.GameReq;
import com.olbl.stickeymain.domain.game.dto.LeftSeatListRes;
import com.olbl.stickeymain.domain.game.dto.Param;
import com.olbl.stickeymain.domain.game.dto.PaymentReq;
import com.olbl.stickeymain.domain.game.dto.SeatInfoReq;
import com.olbl.stickeymain.domain.game.dto.SeatInfoRes;
import com.olbl.stickeymain.domain.game.dto.SportsClubRes;
import com.olbl.stickeymain.domain.game.dto.ViewParam;
import com.olbl.stickeymain.domain.game.entity.Category;
import com.olbl.stickeymain.domain.game.entity.Game;
import com.olbl.stickeymain.domain.game.entity.GameSeat;
import com.olbl.stickeymain.domain.game.entity.SeatStatus;
import com.olbl.stickeymain.domain.game.entity.SportsClub;
import com.olbl.stickeymain.domain.game.entity.Stadium;
import com.olbl.stickeymain.domain.game.entity.StadiumZone;
import com.olbl.stickeymain.domain.game.repository.GameRepository;
import com.olbl.stickeymain.domain.game.repository.GameSeatRepository;
import com.olbl.stickeymain.domain.game.repository.SportsClubRepository;
import com.olbl.stickeymain.domain.game.repository.StadiumRepository;
import com.olbl.stickeymain.domain.game.repository.StadiumZoneRepository;
import com.olbl.stickeymain.global.auth.CustomUserDetails;
import com.olbl.stickeymain.global.result.error.exception.BusinessException;
import com.olbl.stickeymain.global.util.S3Util;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.script.DefaultRedisScript;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

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

    //Util
    private final S3Util s3Util;
    private final StringRedisTemplate redisTemplate;
    private final TaskScheduler taskScheduler;

    @Override
    @Transactional
    public void registGame(GameReq gameReq, MultipartFile gameImage) {
        SportsClub homeTeam = sportsClubRepository.findSportsClubByName(gameReq.getHomeTeamName())
            .orElseThrow(() -> new BusinessException(SPORTS_CLUB_DO_NOT_EXISTS));
        SportsClub awayTeam = sportsClubRepository.findSportsClubByName(gameReq.getAwayTeamName())
            .orElseThrow(() -> new BusinessException(SPORTS_CLUB_DO_NOT_EXISTS));
        Stadium stadium = stadiumRepository.findStadiumById(gameReq.getStadiumId())
            .orElseThrow(() -> new BusinessException(STADIUM_DO_NOT_EXISTS));

        String fileUrl = null;
        if (gameImage != null) {
            fileUrl = s3Util.uploadFile(gameImage, 4);
        }

        Game game = Game.builder()
            .stadium(stadium)
            .homeTeam(homeTeam)
            .awayTeam(awayTeam)
            .category(Category.valueOf(gameReq.getCategory()))
            .gameStartTime(gameReq.getGameStartTime())
            .bookStartTime(gameReq.getBookStartTime())
            .bookEndTime(gameReq.getBookEndTime())
            .gameImage(fileUrl)
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
    public List<SeatInfoRes> getSeatStatus(int id, int zoneId) throws JsonProcessingException {
        Game game = gameRepository.findById(id)
            .orElseThrow(() -> new BusinessException(GAME_DO_NOT_EXISTS)); //game id 있는지 확인
        StadiumZone stadiumZone = stadiumZoneRepository.findById(zoneId)
            .orElseThrow(() -> new BusinessException(STADIUM_ZONE_DO_NOT_EXISTS)); // zone id 있는지 확인

        String key = "game:" + game.getId() + ":zone:" + stadiumZone.getName(); //key 만들기
        List<String> seatInfoList = redisTemplate.opsForList()
            .range(key, 0, -1);//redis에서 key에 해당되는 모든 좌석정보 가져오기 - 좌석 번호, 좌석 상태

        List<SeatInfoRes> seatInfos = new ArrayList<>();
        int seatNum = 1;

        for (String seatInfoStr : seatInfoList) {
            SeatInfoRes seatInfoRes = new SeatInfoRes();
            seatInfoRes.setStatus(seatInfoStr);
            seatInfoRes.setSeatNumber(seatNum);

            seatInfos.add(seatInfoRes);
            seatNum++;
        }
        return seatInfos;
    }

    @Override
    @Transactional
    public Boolean tryReserveSeats(int id, int zoneId, SeatInfoReq seatInfoReq) {

        StadiumZone stadiumZone = stadiumZoneRepository.findById(zoneId)
            .orElseThrow(() -> new BusinessException(STADIUM_ZONE_DO_NOT_EXISTS));

        CustomUserDetails userDetails = (CustomUserDetails) SecurityContextHolder.getContext()
            .getAuthentication().getPrincipal();

        String key = String.format("game:%s:zone:%s", id, stadiumZone.getId()); // Redis 키 생성

        // Lua 스크립트 - 주어진 인덱스의 모든 좌석이 "AVAILABLE"이면 "HOLDING"로 변경
        String luaScript =
            "local userId = ARGV[1] " + // 사용자 ID를 첫 번째 인자로 받음
                "local key = KEYS[1] " +
                "for i = 2, #ARGV do " + // ARGV[1]은 userId이므로, 좌석 번호는 ARGV[2]부터 시작
                "    local seatNumberStr = ARGV[i] " +
                "    local seatIndex = tonumber(seatNumberStr) - 1 " + // 좌석 번호를 인덱스로 변환
                "    if redis.call('LINDEX', key, seatIndex) ~= 'AVAILABLE' then " +
                "        return 0 " +
                "    end " +
                "end " +
                "for i = 2, #ARGV do " + // 동일하게, 좌석 번호 처리를 위해 ARGV[2]부터 시작
                "    local seatIndex = tonumber(ARGV[i]) - 1 " + // 좌석 번호를 인덱스로 변환
                "    redis.call('LSET', key, seatIndex, 'HOLDING:' .. userId) " +
                // 사용자 ID와 함께 HOLDING 상태로 변경
                "end " +
                "return 1";

        String[] seatNumbersArray = seatInfoReq.getSeatNumbers().stream()
            .map(Object::toString)
            .toArray(String[]::new);

        // Lua 스크립트 실행 시 사용자 ID도 인자로 전달
        Long result = redisTemplate.execute(new DefaultRedisScript<Long>(luaScript, Long.class),
            Collections.singletonList(key),
            Stream.concat(Stream.of(String.valueOf(userDetails.getId())),
                    Arrays.stream(seatNumbersArray))
                .toArray(String[]::new));

        // 결과가 1이면 선점 성공
        if (result != null && result == 1) {
            // 15분 후 좌석 상태를 AVAILABLE로 변경하는 작업
            Runnable releaseTask = () -> {
                String releaseScript =
                    "local userId = ARGV[1] " +
                        "for i = 2, #ARGV do " +
                        "    local seatIndex = tonumber(ARGV[i]) - 1 " +
                        "    if redis.call('LINDEX', KEYS[1], seatIndex) == 'HOLDING:' .. userId then "
                        +
                        "        redis.call('LSET', KEYS[1], seatIndex, 'AVAILABLE') " +
                        "    end " +
                        "end";
                redisTemplate.execute(new DefaultRedisScript<Void>(releaseScript, Void.class),
                    Collections.singletonList(key),
                    Stream.concat(Stream.of(String.valueOf(userDetails.getId())),
                            Arrays.stream(seatNumbersArray))
                        .toArray(String[]::new));
            };

            // 현재 시간으로부터 15분 후 - test용 3분 후
            Date fifteenMinutesLater = new Date(System.currentTimeMillis() + 1 * 60 * 1000);

            // TaskScheduler를 사용하여 작업을 스케줄링
            taskScheduler.schedule(releaseTask, fifteenMinutesLater);

            return true;
        } else {
            return false;
        }
    }

    @Override
    @Transactional
    public void registSeats(PaymentReq paymentReq) {

        String key = String.format("game:%s:zone:%s", paymentReq.getGameId(),
            paymentReq.getZoneId()); // Redis 키 생성

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null) {
            throw new BusinessException(FORBIDDEN_ERROR);
        }

        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal(); //로그인 한 유저정보 확인

        // 좌석 번호 목록을 스트림으로 변환하여 Redis에 저장된 선점 상태 확인
        List<String> seatNumbersStr = paymentReq.getSeatNumbers().stream().map(Object::toString)
            .collect(Collectors.toList());

        String checkScript =
            "local userId = ARGV[1] " +
                "local key = KEYS[1] " +
                "for i = 2, #ARGV do " +
                "    local seatIndex = tonumber(ARGV[i]) - 1 " + // 좌석 번호를 인덱스로 변환
                "    if redis.call('LINDEX', key, seatIndex) ~= 'HOLDING:' .. userId then " +
                "        return 0 " + // 하나라도 일치하지 않으면 선점 확인 실패
                "    end " +
                "end " +
                "for i = 2, #ARGV do " +
                "    local seatIndex = tonumber(ARGV[i]) - 1 " +
                "    redis.call('LSET', key, seatIndex, 'SOLD') " + // 선점 확인 성공 시, SOLD로 상태 변경
                "end " +
                "return 1"; // 모두 일치하면 선점 확인 성공

        Long result = redisTemplate.execute(new DefaultRedisScript<Long>(checkScript, Long.class),
            Collections.singletonList(key),
            Stream.concat(Stream.of(String.valueOf(userDetails.getId())), seatNumbersStr.stream())
                .toArray(String[]::new));

        if (result == null || result != 1) {
            throw new BusinessException(HOLDING_TIME_OVER); // 선점 확인 실패 또는 SOLD로 상태 변경 실패 처리
        }

        // 좌석 결제 완료 시
        for (int seatNum : paymentReq.getSeatNumbers()) {
            GameSeat gameSeat = gameSeatRepository.findGameSeatByGameIdAndZoneIdAndSeatNumber(
                    paymentReq.getGameId(),
                    paymentReq.getZoneId(), seatNum)
                .orElseThrow(() -> new BusinessException(GAME_NOT_IN_RESERVATOIN_PROGRESS));

            gameSeat.changeStatus(SeatStatus.SOLD);
        }
    }

    @Override
    public List<SportsClubRes> getClubs(Param param, Authentication authentication) {
        int id = -1;

        if (authentication != null) {
            CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
            id = userDetails.getId();
        }

        List<SportsClubRes> sportsClubRes = sportsClubRepository.getSportsClubByParam(param, id);
        sportsClubRes.sort(Comparator.comparing(SportsClubRes::getIsPrefer).reversed());

        return sportsClubRes;
    }
}
