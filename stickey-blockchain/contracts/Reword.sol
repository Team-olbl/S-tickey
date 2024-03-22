// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// 리워드 토큰 관련 컨트랙트
contract Reword is ERC20 {

  // 후원 증감의 종류 3가지
  enum RewordType { ReserveTicket, CancleTicket, BuyItem } 

  // 리워드 증감 내역
  struct RewordHistory {
    uint amount;
    uint balance;
    uint arrivedTime;
    RewordType rewordType;
  }

  // Reword 메소드를 호출하는 주소는 반드시 Stickey 컨트랙트
  address private _caller;

  // 꿈 내역 ( 지갑 주소 => 꿈 증감 내역 )
  mapping(address => RewordHistory[]) public _rewordHistory;

  constructor() ERC20(unicode"꿈 토큰", unicode"꿈") {
  }
  
  // caller 설정
  function setcaller(address _ticketAddress) external {
    require(_caller == address(0), "already set caller");
    _caller = _ticketAddress;
  }

  // 토큰 발행
  function mintReword(address _to, uint _amount) external checkCaller {
    _rewordHistory[_to].push(RewordHistory({
      amount : _amount,
      balance : balanceOf(_to) + _amount,
      arrivedTime : block.timestamp,
      rewordType : RewordType.ReserveTicket
    }));

    _mint(_to, _amount);
  }

  // 토큰 파기
  function burnReword(address _to, uint _amount, RewordType _rewordType) external checkCaller {
    _rewordHistory[_to].push(RewordHistory({
      amount : _amount,
      balance : balanceOf(_to) - _amount,
      arrivedTime : block.timestamp,
      rewordType : _rewordType
    }));

    _burn(_to, _amount);
  }

  // 꿈 증감 내역 조회
  function getRewordHistory(address _addr) external view checkCaller returns(RewordHistory[] memory) {
    return _rewordHistory[_addr];
  }

  // caller 확인
  modifier checkCaller() {
    require(_caller != address(0), "Doesn't set caller");
    require(_caller == msg.sender, "Invalid call");
    _;
  }

}
