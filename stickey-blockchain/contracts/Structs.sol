// SPDX-License-Identifier: MIT
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
    uint price;
    uint filterId;
    uint backGroundId;
  }

  struct ItemInfo {
    uint itemId;
    string itemName;
    uint price;
    bool isFilter;
  }

} 