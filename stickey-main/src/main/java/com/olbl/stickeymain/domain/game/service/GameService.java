package com.olbl.stickeymain.domain.game.service;

import com.olbl.stickeymain.domain.game.dto.GameListRes;
import com.olbl.stickeymain.domain.game.dto.GameReq;
import com.olbl.stickeymain.domain.game.dto.ViewParam;

public interface GameService {

    void registGame(GameReq gameReq);

    GameListRes getGames(ViewParam viewParam);
}
