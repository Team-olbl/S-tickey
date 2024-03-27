package com.olbl.stickeymain.domain.game.service;

import com.olbl.stickeymain.domain.game.dto.GameListRes;
import com.olbl.stickeymain.domain.game.dto.GameReq;
import com.olbl.stickeymain.domain.game.dto.LeftSeatListRes;
import com.olbl.stickeymain.domain.game.dto.Param;
import com.olbl.stickeymain.domain.game.dto.SeatStatusRes;
import com.olbl.stickeymain.domain.game.dto.SportsClubRes;
import com.olbl.stickeymain.domain.game.dto.ViewParam;
import java.util.List;
import org.springframework.security.core.Authentication;
import org.springframework.web.multipart.MultipartFile;

public interface GameService {

    void registGame(GameReq gameReq, MultipartFile gameImage);

    GameListRes getGames(ViewParam viewParam);

    LeftSeatListRes getLeftSeats(int id);

    List<SeatStatusRes> getSeatStatus(int id, int zoneId);

    List<SportsClubRes> getClubs(Param param, Authentication authentication);
}
