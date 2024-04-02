package com.olbl.stickeymain.domain.game.service;

import static com.olbl.stickeymain.global.result.error.ErrorCode.FORBIDDEN_ERROR;
import static com.olbl.stickeymain.global.result.error.ErrorCode.GAME_DO_NOT_EXISTS;
import static com.olbl.stickeymain.global.result.error.ErrorCode.GAME_NOT_IN_RESERVATOIN_PROGRESS;
import static com.olbl.stickeymain.global.result.error.ErrorCode.HOLDING_TIME_OVER;
import static com.olbl.stickeymain.global.result.error.ErrorCode.SEAT_NOT_SOLD;
import static com.olbl.stickeymain.global.result.error.ErrorCode.SPORTS_CLUB_DO_NOT_EXISTS;
import static com.olbl.stickeymain.global.result.error.ErrorCode.STADIUM_DO_NOT_EXISTS;
import static com.olbl.stickeymain.global.result.error.ErrorCode.STADIUM_ZONE_DO_NOT_EXISTS;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.olbl.stickeymain.domain.game.dto.GameListRes;
import com.olbl.stickeymain.domain.game.dto.GameReq;
import com.olbl.stickeymain.domain.game.dto.LeftSeatListRes;
import com.olbl.stickeymain.domain.game.dto.LeftSeatRes;
import com.olbl.stickeymain.domain.game.dto.Param;
import com.olbl.stickeymain.domain.game.dto.PaymentReq;
import com.olbl.stickeymain.domain.game.dto.SeatInfoReq;
import com.olbl.stickeymain.domain.game.dto.SeatInfoRes;
import com.olbl.stickeymain.domain.game.dto.SportsClubRes;
import com.olbl.stickeymain.domain.game.dto.ViewParam;
import com.olbl.stickeymain.domain.game.dto.ZoneDto;
import com.olbl.stickeymain.domain.game.entity.Category;
import com.olbl.stickeymain.domain.game.entity.Game;
import com.olbl.stickeymain.domain.game.entity.GameSeat;
import com.olbl.stickeymain.domain.game.entity.SeatStatus;
import com.olbl.stickeymain.domain.game.entity.SportsClub;
import com.olbl.stickeymain.domain.game.entity.Stadium;
import com.olbl.stickeymain.domain.game.entity.StadiumSeat;
import com.olbl.stickeymain.domain.game.entity.StadiumSeatId;
import com.olbl.stickeymain.domain.game.entity.StadiumZone;
import com.olbl.stickeymain.domain.game.repository.GameRepository;
import com.olbl.stickeymain.domain.game.repository.GameSeatRepository;
import com.olbl.stickeymain.domain.game.repository.SportsClubRepository;
import com.olbl.stickeymain.domain.game.repository.StadiumRepository;
import com.olbl.stickeymain.domain.game.repository.StadiumSeatRepository;
import com.olbl.stickeymain.domain.game.repository.StadiumZoneRepository;
import com.olbl.stickeymain.domain.notify.service.NotifyService;
import com.olbl.stickeymain.global.auth.CustomUserDetails;
import com.olbl.stickeymain.global.result.error.ErrorCode;
import com.olbl.stickeymain.global.result.error.exception.BusinessException;
import com.olbl.stickeymain.global.util.S3Util;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.Cursor;
import org.springframework.data.redis.core.ScanOptions;
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

    //Service
    private final NotifyService notifyService;

    //Repository
    private final GameRepository gameRepository;
    private final SportsClubRepository sportsClubRepository;
    private final StadiumRepository stadiumRepository;
    private final GameSeatRepository gameSeatRepository;
    private final StadiumZoneRepository stadiumZoneRepository;
    private final StadiumSeatRepository stadiumSeatRepository;

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

        int stadiumId = game.getStadium().getId(); // 경기장 Id
        //해당 경기장에 속한 구역 id, price, zoneName 리스트 가져오기
        Map<Integer, ZoneDto> zoneIds = stadiumZoneRepository.findZoneByStadiumIdAndMap(stadiumId);
        //StadiumSeat -> Zone 별로 좌석 개수 가져오기
        List<Integer> zoneIdList = zoneIds.keySet().stream().toList();
        Map<Integer, Long> countDto = stadiumSeatRepository.findSeatCountsGroupByZoneId(zoneIdList);

        List<GameSeat> gameSeatList = new ArrayList<>();

        //for문으로 저장 game, zoneId, zoneName, seatNumber, status, price
        for (int i = 0; i < zoneIdList.size(); i++) {
            for (int j = 1; j <= countDto.get(zoneIdList.get(i)); j++) {
                GameSeat gameSeat = GameSeat.builder()
                    .game(game)
                    .zoneId(zoneIdList.get(i))
                    .zoneName(zoneIds.get(zoneIdList.get(i)).getName())
                    .seatNumber(j)
                    .status(SeatStatus.AVAILABLE)
                    .price(zoneIds.get(zoneIdList.get(i)).getPrice())
                    .build();

                gameSeatList.add(gameSeat);
            }
        }
        gameSeatRepository.saveAll(gameSeatList);
    }

    @Override
    @Transactional
    public void registStadiumSeats(int id) {
        List<StadiumZone> stadiumZones = stadiumZoneRepository.findAllByStadiumId(id);

        stadiumZones.forEach(zone -> {
            for (int j = 1; j <= 30; j++) {
                //TODO: select, insert 쿼리 둘다 나가는것 리팩토링
                StadiumSeat stadiumSeat = StadiumSeat.builder()
                    .stadiumZone(zone)
                    .id(StadiumSeatId.builder()
                        .seatId(j)
                        .zoneId(zone.getId())
                        .build())
                    .build();

                stadiumSeatRepository.save(stadiumSeat);
            }
        });
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
        // 참가열 존재 여부 확인
        CustomUserDetails userDetails = (CustomUserDetails) SecurityContextHolder.getContext()
            .getAuthentication().getPrincipal();
        existsInRunningQueue(id, userDetails.getId());

        Game game = gameRepository.findById(id)
            .orElseThrow(() -> new BusinessException(GAME_DO_NOT_EXISTS)); //game id 있는지 확인

        List<LeftSeatRes> leftSeatResList = new ArrayList<>();

        //구역 id(key값)-[구역명, 가격 ] map으로 저장하기
        Map<Integer, ZoneDto> map = stadiumZoneRepository.findZoneByStadiumIdAndMap(
            game.getStadium().getId());

        //redis에서 패턴에 맞는 키 찾기 - scan 사용
        String pattern = "game:" + id + ":" + "zone" + ":*";
        Cursor<String> cursor = redisTemplate.scan(
            ScanOptions.scanOptions().match(pattern).build());

        //해당 키에 대한 값 조회
        cursor.forEachRemaining(key -> {
            String[] splited = key.split(":");
            int zoneId = Integer.parseInt(splited[3]);

            LeftSeatRes leftSeatRes = new LeftSeatRes();

            AtomicInteger availableSeatCount = new AtomicInteger(0);
            AtomicInteger totalSeatCount = new AtomicInteger(0);
            List<String> values = redisTemplate.opsForList().range(key, 0, -1); //각 키에 대해 리스트의 값 조회

            //AVAILABLE 상태인 항목의 수를 세어 합산, 전체 좌석 수도 count 해서 합산
            values.forEach(value -> {
                if ("AVAILABLE".equals(value)) {
                    availableSeatCount.getAndIncrement();
                }
                totalSeatCount.getAndIncrement();
            });

            //Response 세팅
            leftSeatRes.setLeftSeatCnt(availableSeatCount.get());
            leftSeatRes.setTotalSeatCnt(totalSeatCount.get());
            leftSeatRes.setZoneId(zoneId);
            leftSeatRes.setZoneName(map.get(zoneId).getName());
            leftSeatRes.setPrice(map.get(zoneId).getPrice());

            leftSeatResList.add(leftSeatRes);
        });

        leftSeatResList.sort(new Comparator<LeftSeatRes>() {
            @Override
            public int compare(LeftSeatRes o1, LeftSeatRes o2) {
                return o1.getZoneId() - o2.getZoneId();
            }
        });

        return new LeftSeatListRes(leftSeatResList);
    }

    @Override
    public List<SeatInfoRes> getSeatStatus(int id, int zoneId) throws JsonProcessingException {
        // 참가열 존재 여부 확인
        CustomUserDetails userDetails = (CustomUserDetails) SecurityContextHolder.getContext()
            .getAuthentication().getPrincipal();
        existsInRunningQueue(id, userDetails.getId());

        Game game = gameRepository.findById(id)
            .orElseThrow(() -> new BusinessException(GAME_DO_NOT_EXISTS)); //game id 있는지 확인
        StadiumZone stadiumZone = stadiumZoneRepository.findById(zoneId)
            .orElseThrow(() -> new BusinessException(STADIUM_ZONE_DO_NOT_EXISTS)); // zone id 있는지 확인

        String key = "game:" + game.getId() + ":zone:" + stadiumZone.getId(); //key 만들기
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
        // 참가열 존재 여부 확인
        CustomUserDetails userDetails = (CustomUserDetails) SecurityContextHolder.getContext()
            .getAuthentication().getPrincipal();
        existsInRunningQueue(id, userDetails.getId());

        StadiumZone stadiumZone = stadiumZoneRepository.findById(zoneId)
            .orElseThrow(() -> new BusinessException(STADIUM_ZONE_DO_NOT_EXISTS));

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

            // 현재 시간으로부터 3분 후
            Date fifteenMinutesLater = new Date(System.currentTimeMillis() + 3 * 60 * 1000);

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
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null) {
            throw new BusinessException(FORBIDDEN_ERROR);
        }
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal(); //로그인 한 유저정보 확인

        String key = String.format("game:%s:zone:%s", paymentReq.getGameId(),
            paymentReq.getZoneId()); // Redis 키 생성

        if (!paymentReq.getIsRefund()) { //결제 요청시
            // 참가열 존재 여부 확인
            existsInRunningQueue(paymentReq.getGameId(), userDetails.getId());

            // 좌석 번호 목록을 스트림으로 변환하여 Redis에 저장된 선점 상태 확인
            List<String> seatNumbersStr = paymentReq.getSeatNumbers().stream().map(Object::toString)
                .collect(Collectors.toList());

            String checkAndSetScript =
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

            Long result = redisTemplate.execute(
                new DefaultRedisScript<Long>(checkAndSetScript, Long.class),
                Collections.singletonList(key),
                Stream.concat(Stream.of(String.valueOf(userDetails.getId())),
                        seatNumbersStr.stream())
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
                //TODO: 데이터 베이스 작업 실패 시 Redis에서 변경 사항 롤백하는 보상 트랜잭션 실행 로직 작성
            }

        } else { //환불 요청시
            String seatNumberStr = paymentReq.getSeatNumbers().get(0).toString();

            String checkAndSetScript =
                "local key = KEYS[1] " +
                    "local seatIndex = tonumber(ARGV[1]) - 1 " + // 좌석 번호를 인덱스로 변환
                    "if redis.call('LINDEX', key, seatIndex) ~= 'SOLD' then " +
                    "    return 0 " + // SOLD 상태가 아니면 변경 작업 실패
                    "end " +
                    "redis.call('LSET', key, seatIndex, 'AVAILABLE') " +
                    // SOLD 상태 확인 성공 시, AVAILABLE로 상태 변경
                    "return 1"; // 확인된 SOLD 상태 좌석을 AVAILABLE로 변경 성공

            Long result = redisTemplate.execute(
                new DefaultRedisScript<Long>(checkAndSetScript, Long.class),
                Collections.singletonList(key), seatNumberStr);

            if (result == null || result != 1) {
                throw new BusinessException(SEAT_NOT_SOLD);
            }

            // 좌석 정보 AVAILABLE로 수정
            GameSeat gameSeat = gameSeatRepository.findGameSeatByGameIdAndZoneIdAndSeatNumber(
                    paymentReq.getGameId(),
                    paymentReq.getZoneId(), Integer.parseInt(seatNumberStr))
                .orElseThrow(() -> new BusinessException(GAME_NOT_IN_RESERVATOIN_PROGRESS));

            gameSeat.changeStatus(SeatStatus.AVAILABLE);
            //TODO: 데이터 베이스 작업 실패 시 Redis에서 변경 사항 롤백하는 보상 트랜잭션 실행 로직 작성
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

    @Override
    public void cancelReserve(int id, Authentication authentication) {
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal(); //로그인 한 유저정보 확인
        log.info("[cancelReserve] 참가열 취소 요청 : {}", userDetails.getId());
        removeFromRunQueue(id, userDetails.getId());
    }

    private void existsInRunningQueue(int gameId, int userId) {
        String runKey = "run::" + gameId;
        Long rank = redisTemplate.opsForZSet().rank(runKey, String.valueOf(userId));
        
        if (rank == null) {
            log.info("[existsInRunningQueue] 참가열에 존재하지 않는 유저 요청 : ", userId);
            throw new BusinessException(ErrorCode.NOT_IN_RUNNING_QUEUE);
        }
    }

    private void removeFromRunQueue(int gameId, int userId) {
        redisTemplate.opsForZSet().remove("run::" + gameId, String.valueOf(userId));
    }
}
