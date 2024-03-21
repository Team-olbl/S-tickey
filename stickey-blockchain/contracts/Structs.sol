// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

interface Structs {
  
  // 경기 정보
  struct GameInfo {
    uint gameId;          // 경기 ID
    uint bookStartTime;   // 예매 시작 시간
    uint gameStartTime;   // 경기 시작 시간
    string stadium;       // 경기장 이름
    string homeTeam;      // 홈팀 이름
    string awayTeam;      // 원정팀 이름
    string poster;        // 포스터 url
  }

  // 티켓 정보
  struct TicketInfo {
    uint tokenId;         // 토큰 ID
    uint gameId;          // 경기 ID
    uint areaId;          // 구역 ID
    uint seatNum;         // 좌석 번호
    uint price;           // 티켓 가격
    uint filterId;        // 적용된 필터 ID
    uint backGroundId;    // 적용된 배경색 ID
  }

  // 아이템 정보
  struct ItemInfo {
    uint itemId;          // 아이템 ID
    string itemName;      // 아이템 이름
    uint price;           // 아이템 가격
    bool isFilter;        // 필터인지 배경색인지 구분
  }

  // 후원글에 대한 후원 정보
  struct SupportInfo {
    uint supportId;       // 후원글 ID
    address addr;         // 후원단체의 지갑 주소 
    uint balance;         // 현재 모인 후원금
    uint endTime;         // 후원 마감 시간
  }

  // 프론트에 보내는 구조체
  struct Ticket {
    TicketInfo ticket;    // 티켓 정보
    GameInfo game;        // 경기 정보
  }

} 