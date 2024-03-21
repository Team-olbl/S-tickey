package com.olbl.stickeymain.domain.game.repository;

import com.olbl.stickeymain.domain.game.dto.LeftSeatListRes;

public interface GameSeatRepositoryQuerydsl {

    LeftSeatListRes getLeftSeatListResByGameId(int id);
}
