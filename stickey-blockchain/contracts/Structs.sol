// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

interface Structs {
  
  struct GameInfo {
    uint gameId;          // 경기 ID
    uint ticketingTime;   // 에매 시작 시간
    uint gameTime;        // 경기 시작 시간
  }

  struct TicketInfo {
    uint tokenId;         // 토큰 ID
    uint gameId;          // 경기 ID
    uint areaId;          // 구역 ID
    uint seatNum;         // 좌석 번호
    uint price;           // 티켓 가격
    uint filterId;        // 적용된 필터 ID
    uint backGroundId;    // 적용된 배경색 ID
  }

  struct ItemInfo {
    uint itemId;          // 아이템 ID
    string itemName;      // 아이템 이름
    uint price;           // 아이템 가격
    bool isFilter;        // 필터인지 배경색인지 구분
  }

} 