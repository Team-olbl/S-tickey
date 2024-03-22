// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./Reword.sol";
import "./Ticket.sol";
import "./Support.sol";
import "./Game.sol";
import "./Item.sol";

contract ApplicationHandler is Support, Ticket, Item, Game {

  address owner; // 관리자 Address
  Reword reword; // ERC20 구현한 Reword 컨트랙트
  Ticket ticket;

  constructor(address _rewordContractAddress, address _ticketContractAddress) {
    reword = Reword(_rewordContractAddress);
    reword.setCaller(address(this));
    ticket = Ticket(_ticketContractAddress);
    ticket.setCaller(address(this));
    owner = msg.sender;
  }

  
  
}