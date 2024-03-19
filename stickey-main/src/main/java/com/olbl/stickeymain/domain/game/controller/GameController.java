package com.olbl.stickeymain.domain.game.controller;

import static com.olbl.stickeymain.global.result.ResultCode.GAME_REGISTER_SUCCESS;
import static com.olbl.stickeymain.global.result.ResultCode.GET_GAMES_SUCCESS;

import com.olbl.stickeymain.domain.game.dto.GameListRes;
import com.olbl.stickeymain.domain.game.dto.GameReq;
import com.olbl.stickeymain.domain.game.dto.ViewParam;
import com.olbl.stickeymain.domain.game.service.GameService;
import com.olbl.stickeymain.global.result.ResultResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
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
}
