package com.olbl.stickeymain.domain.game.dto;

import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GameRes { //경기 목록 조회

    private int id;//경기 id
    private String stadium; //경기장 명
    private String homeTeam; //홈팀 명
    private String awayTeam; //원정팀 명
    private LocalDateTime bookStartTime; //경기 티켓팅 오픈 시간
    private LocalDateTime bookEndTime; //티켓팅 종료 시간
    private LocalDateTime gameStartTime; //경기 시작 시간

}
