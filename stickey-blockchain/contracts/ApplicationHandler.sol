// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./Api.sol";

contract ApplicationHandler is Api {

  address owner; // 관리자 Address

  constructor(address _rewordContractAddress) Api(_rewordContractAddress) {
    owner = msg.sender;
  }

}