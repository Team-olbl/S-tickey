// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./Reword.sol";
import "./Support.sol";
import "./Ticket.sol";
import "./Game.sol";
import "./Item.sol";

contract Stickey is Support, Ticket, Item, Game {

  address admin;
  // Reword reword;

  // 이름 Stickey, 심볼 TKT (티켓 토큰)
  constructor() {
    // reword = Reword(_rewordContractAddress);
    // reword.setTicketCaller(address(this));
    // admin = msg.sender;
    // _ticketPriceInfo[1][1] = 10 ** 9; // 더미 데이터
    // addGame(1, block.timestamp);
    // addGame(2, block.timestamp + 3 days);
    // addGame(3, block.timestamp + 5 days);

    // addItem(1, unicode"아이템1", 1000, false);
    // addItem(2, unicode"아이템2", 1000, false);
    // addItem(3, unicode"엄청 비싼 아이템", 500000, true);
    // addItem(4, unicode"필터 아이템1", 1000, true);
    // addItem(5, unicode"필터 아이템2", 1000, true);
    
  } 

  // 아이템 정보 추가
  // function addItem(uint id, string memory name, uint price, bool isFilter) public isAdmin {

  // }

  // // 가진 티켓 조회
  // function getTicketsByAccount() public view returns (Ticket[] memory) {
  //   uint[] memory tickets = _ownedTicket[msg.sender];
  //   Ticket[] memory ret = new Ticket[](tickets.length);

  //   for(uint i = 0; i < tickets.length; i++) {
  //     ret[i] = Ticket(_ticketInfo[tickets[i]], _gameInfo[_ticketInfo[tickets[i]].gameId]);
  //   }

  //   return ret;
  // }

  // // 티켓 삭제
  // function deleteTicketByAccount(uint tokenId) private {
  //   for(uint i = 0; i < _ownedTicket[msg.sender].length; i++) {
  //     if(_ownedTicket[msg.sender][i] == tokenId){
  //       _ownedTicket[msg.sender][i] = _ownedTicket[msg.sender][_ownedTicket[msg.sender].length - 1];
  //       _ownedTicket[msg.sender].pop();
  //       return; 
  //     }
  //   }
  // }

  // // 아이템 적용
  // function setItemOnTicket(uint tokenId, uint itemId, uint supportId) public {
  //   require(ownerOf(tokenId) == msg.sender, "you're not owner of this ticket"); // 티켓 소유자 확인
    
  //   ItemInfo memory i = _itemInfo[itemId];
  //   require(reword.balanceOf(msg.sender) >= i.price, "Wrong amount");  // 아이템 가격 만큼 꿈이 있는지 확인

  //   if(i.isFilter) {
  //     _ticketInfo[tokenId].filterId = itemId;
  //   } else {
  //     _ticketInfo[tokenId].backGroundId = itemId;
  //   }

  //   _supportInfo[supportId].balance += i.price / 2;    
  //   reword.burnReword(msg.sender, i.price);
  // }


  modifier isAdmin() {
    require(msg.sender == admin, "Permission Denied");
    _;
  }
}