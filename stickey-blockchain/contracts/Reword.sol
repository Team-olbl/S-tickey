// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Reword is ERC20 {

    address public ticketCaller;

  constructor() ERC20("DreamToken", "DT") {
  }
  
  function setTicketCaller(address _ticketAddress) public {
    require(ticketCaller == address(0), "already set TicketCaller");
    ticketCaller = _ticketAddress;
  }

  function mintReword(address to, uint amount) public checkTicketCaller {
    _mint(to, amount);
  }

  function burnReword(address to, uint amount) public checkTicketCaller {
    _burn(to, amount);
  }


  modifier checkTicketCaller() {
    require(ticketCaller != address(0), "Doesn't set TicketCaller");
    require(ticketCaller == msg.sender, "Invalid call");
    _;
  }
}
