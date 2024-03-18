// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.0 <0.9.0;

interface Structs {
  
  struct GameInfo {
    uint gameId;
    uint ticketingTime;
    uint gameTime;
  }

  struct TicketInfo {
    uint tokenId;
    uint gameId;
    uint areaId;
    uint seatNum;
    uint status; // 0 : 대기, 1 : 예매, 2 : 환불
    uint filterId;
    uint backGroundId;
  }

  struct ItemInfo {
    uint itemId;
    string itemName;
    uint price;
    uint itemType;
  }

} 