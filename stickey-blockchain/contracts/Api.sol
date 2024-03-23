// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./Reword.sol";
import "./Ticket.sol";
import "./Support.sol";
import "./Game.sol";
import "./Item.sol";

contract Api is Support, Ticket, Item, Game {

  Reword reword; // ERC20 구현한 Reword 컨트랙트

  constructor(address _rewordContractAddress) {
    reword = Reword(_rewordContractAddress);
    reword.setCaller(address(this));
  }





}