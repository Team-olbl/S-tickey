package com.olbl.stickeymain.domain.game.controller;

import static com.olbl.stickeymain.global.result.ResultCode.GAME_REGISTER_SUCCESS;

import com.olbl.stickeymain.domain.game.dto.GameReq;
import com.olbl.stickeymain.domain.game.service.GameService;
import com.olbl.stickeymain.global.result.ResultResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/games")
@RequiredArgsConstructor
@Tag(name = "GameController", description = "경기 예매 관련 api")
public class GameController {

    private final GameService gameService;

    @Operation(summary = "경기 등록")
    @PostMapping()
    public ResponseEntity<ResultResponse> registGame(@RequestBody GameReq gameReq) {
        //TODO: 경기 포스터 사진 입력받기
        gameService.registGame(gameReq);
        return ResponseEntity.ok(ResultResponse.of(GAME_REGISTER_SUCCESS));
    }

    //TODO: 경기 목록 조회

    //TODO: 경기 예매하기 버튼 눌렀을 때
}
