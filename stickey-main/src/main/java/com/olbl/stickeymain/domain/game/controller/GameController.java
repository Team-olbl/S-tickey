package com.olbl.stickeymain.domain.game.controller;

import static com.olbl.stickeymain.global.result.ResultCode.GAME_REGISTER_SUCCESS;
import static com.olbl.stickeymain.global.result.ResultCode.GET_CLUBS_SUCCESS;
import static com.olbl.stickeymain.global.result.ResultCode.GET_GAMES_SUCCESS;
import static com.olbl.stickeymain.global.result.ResultCode.GET_REMAINING_SEATS_SUCCESS;
import static com.olbl.stickeymain.global.result.ResultCode.GET_SEAT_STATUS_SUCCESS;
import static com.olbl.stickeymain.global.result.ResultCode.HOLD_SEATS_FAIL;
import static com.olbl.stickeymain.global.result.ResultCode.HOLD_SEATS_SUCCESS;
import static com.olbl.stickeymain.global.result.ResultCode.PAYMENT_SUCCESS;
import static com.olbl.stickeymain.global.result.ResultCode.REMOVE_RUNNING_QUEUE_SUCCESS;

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
import com.olbl.stickeymain.domain.game.service.GameService;
import com.olbl.stickeymain.global.result.ResultResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@RestController
@RequestMapping("/games")
@RequiredArgsConstructor
@Tag(name = "GameController", description = "경기 예매 관련 api")
public class GameController {

    private final GameService gameService;

    @Operation(summary = "경기 등록")
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ResultResponse> registGame(
        @RequestPart(value = "gameReq") @Valid GameReq gameReq,
        @RequestPart(value = "gameImage") MultipartFile gameImage) {
        gameService.registGame(gameReq, gameImage);
        return ResponseEntity.ok(ResultResponse.of(GAME_REGISTER_SUCCESS));
    }

    @Operation(summary = "경기 목록 조회")
    @GetMapping
    public ResponseEntity<ResultResponse> getGames(
        @ModelAttribute @ParameterObject @Valid ViewParam viewParam) {
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
        @PathVariable(value = "zoneId") int zoneId) throws JsonProcessingException {
        List<SeatInfoRes> seatStatusListRes = gameService.getSeatStatus(id, zoneId);
        return ResponseEntity.ok(ResultResponse.of(GET_SEAT_STATUS_SUCCESS, seatStatusListRes));
    }

    @Operation(summary = "경기장 특정 구역의 선택한 좌석 선점 확인")
    @PatchMapping("/{id}/zones/{zoneId}/seats")
    public ResponseEntity<ResultResponse> tryReserveSeats(@PathVariable(value = "id") int id,
        @PathVariable(value = "zoneId") int zoneId, @RequestBody SeatInfoReq seatInfoReq) {
        Boolean flag = gameService.tryReserveSeats(id, zoneId, seatInfoReq);
        if (flag) {
            return ResponseEntity.ok(ResultResponse.of(HOLD_SEATS_SUCCESS));
        }
        return ResponseEntity.ok(ResultResponse.of(HOLD_SEATS_FAIL));
    }

    @Operation(summary = "결제 시 좌석 상태 변경")
    @PatchMapping("/{id}")
    public ResponseEntity<ResultResponse> registSeats(@RequestBody PaymentReq paymentReq) {
        gameService.registSeats(paymentReq);
        return ResponseEntity.ok(ResultResponse.of(PAYMENT_SUCCESS));
    }

    @Operation(summary = "구단 목록 조회")
    @GetMapping("/clubs")
    public ResponseEntity<ResultResponse> getClubs(@ModelAttribute @ParameterObject Param param,
        Authentication authentication) {
        List<SportsClubRes> sportsClubList = gameService.getClubs(param, authentication);
        return ResponseEntity.ok(ResultResponse.of(GET_CLUBS_SUCCESS, sportsClubList));
    }

    @Operation(summary = "참가열 취소")
    @GetMapping("/{id}/cancel")
    public ResponseEntity<ResultResponse> cancelReserve(@PathVariable(value = "id") int id,
        Authentication authentication) {
        gameService.cancelReserve(id, authentication);
        return ResponseEntity.ok(ResultResponse.of(REMOVE_RUNNING_QUEUE_SUCCESS));
    }
}
