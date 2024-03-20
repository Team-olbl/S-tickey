package com.olbl.stickeymain.domain.game.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class GameListRes {

    private List<GameRes> gameResList;
}
