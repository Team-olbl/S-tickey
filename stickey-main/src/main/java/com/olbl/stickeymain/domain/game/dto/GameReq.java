package com.olbl.stickeymain.domain.game.dto;

import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GameReq {

    @NotNull
    private int stadiumId;
    @NotNull
    private String homeTeamName;
    @NotNull
    private String awayTeamName;
    @NotNull
    private String category;
    @NotNull
    private LocalDateTime bookStartTime;
    @NotNull
    private LocalDateTime bookEndTime;
    @NotNull
    private LocalDateTime gameStartTime;

}
