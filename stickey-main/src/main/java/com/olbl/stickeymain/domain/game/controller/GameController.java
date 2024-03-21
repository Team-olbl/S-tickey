package com.olbl.stickeymain.domain.game.controller;

import static com.olbl.stickeymain.global.result.ResultCode.GAME_REGISTER_SUCCESS;
import static com.olbl.stickeymain.global.result.ResultCode.GET_GAMES_SUCCESS;
import static com.olbl.stickeymain.global.result.ResultCode.GET_REMAINING_SEATS_SUCCESS;
import static com.olbl.stickeymain.global.result.ResultCode.GET_SEAT_STATUS_SCUUESS;

import com.olbl.stickeymain.domain.game.dto.GameListRes;
import com.olbl.stickeymain.domain.game.dto.GameReq;
import com.olbl.stickeymain.domain.game.dto.LeftSeatListRes;
import com.olbl.stickeymain.domain.game.dto.SeatStatusRes;
import com.olbl.stickeymain.domain.game.dto.ViewParam;
import com.olbl.stickeymain.domain.game.service.GameService;
import com.olbl.stickeymain.global.result.ResultResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/games")
@RequiredArgsConstructor
@Tag(name = "GameController", description = "경기 예매 관련 api")
public class GameController {

    private final GameService gameService;

    @Operation(summary = "경기 등록")
    @PostMapping
    public ResponseEntity<ResultResponse> registGame(@RequestBody GameReq gameReq) {
        //TODO: 경기 포스터 사진 입력받기
        gameService.registGame(gameReq);
        return ResponseEntity.ok(ResultResponse.of(GAME_REGISTER_SUCCESS));
    }

    @Operation(summary = "경기 목록 조회")
    @GetMapping
    public ResponseEntity<ResultResponse> getGames(
        @ModelAttribute @ParameterObject @Validated ViewParam viewParam) {
        GameListRes gameListRes = gameService.getGames(viewParam);
        return ResponseEntity.ok(ResultResponse.of(GET_GAMES_SUCCESS, gameListRes));
    }

    @Operation(summary = "특정 경기의 전체 구역 별 잔여좌석 조회")
    @GetMapping("/{id}")
    public ResponseEntity<ResultResponse> getLeftSeats(@PathVariable(value = "id") int id) {
        LeftSeatListRes leftSeatListRes = gameService.getLeftSeats(id);
        return ResponseEntity.ok(ResultResponse.of(GET_REMAINING_SEATS_SUCCESS, leftSeatListRes));
    }

    @Operation(summary = "경기장 특정 구역의 전체 좌석 정보 조회")
    @GetMapping("/{id}/zones/{zoneId}/seats")
    public ResponseEntity<ResultResponse> getSeatStatus(@PathVariable(value = "id") int id,
        @PathVariable(value = "zoneId") int zoneId) {
        List<SeatStatusRes> seatStatusListRes = gameService.getSeatStatus(id, zoneId);
        return ResponseEntity.ok(ResultResponse.of(GET_SEAT_STATUS_SCUUESS, seatStatusListRes));
    }

}
