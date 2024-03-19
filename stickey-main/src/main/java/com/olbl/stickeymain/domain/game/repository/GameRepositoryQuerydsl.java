package com.olbl.stickeymain.domain.game.repository;

import com.olbl.stickeymain.domain.game.dto.GameListRes;
import com.olbl.stickeymain.domain.game.dto.ViewParam;

public interface GameRepositoryQuerydsl {

    GameListRes getGameListResByViewParam(ViewParam viewParam);
}
