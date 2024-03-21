// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

// 후원 관련 컨트랙트
contract Support {

  // 후원글에 대한 후원 정보
  struct SupportInfo {
    uint id;       // 후원글 ID
    address addr;         // 후원단체의 지갑 주소 
    uint balance;         // 현재 모인 후원금
    uint endTime;         // 후원 마감 시간
    // 후원받은 내역 ( 후원 글 ID => 후원 내역 )
    SupportedHistory[] supportedHistory; 
  }

  // 후원받은 내역 구조체
  struct SupportedHistory {
    uint amount;          // 후원한 양
    uint arrivedTime;     // 후원한 시간
    string text;          // 닉네임, 한 줄 글
  }

  // 후원한 내역 구조체
  struct SupportingHistory {
    uint supportId;       // 후원한 후원글 ID
    uint amount;          // 후원한 양
    uint arrivedTime;     // 후원한 시간
    string text;          // 내가 남긴 글
  }

  // 후원 글 정보 ( 후원 글 ID => 후원 글 정보 )
  mapping(uint => SupportInfo) private _supportInfo;

  // 후원한 내역 ( 내 지갑 주소 => 후원 내역 )
  mapping(address => SupportingHistory[]) private _supportingHistory;

  // 후원 글 등록
  function _addSupport(uint _id, address _addr, uint _endTime) internal {
    _supportInfo[_id] = SupportInfo({
      id: _id, 
      addr: _addr,
      balance: 0, 
      endTime: _endTime,
      supportedHistory: new SupportedHistory[](0)
    });
  }

  // 후원
  function _donate(uint _supportId, uint _amount, string memory _text) internal {
    // 현재 시간이 endTime보다 작아야 후원 가능
    require(block.timestamp < _supportInfo[_supportId].endTime, "Sponsorship has ended.");

    // 후원한 내역 저장
    _supportingHistory[msg.sender].push(SupportingHistory({
      supportId: _supportId,
      amount: _amount,
      arrivedTime: block.timestamp,
      text: _text
    }));

    // 후원받은 내역 저장
    _supportInfo[_supportId].supportedHistory.push(SupportedHistory({
      text: _text,
      amount: _amount,
      arrivedTime: block.timestamp
    }));

    // 모은 금액 증가
    _supportInfo[_supportId].balance += _amount;
  }
  
  // 후원금 단체 지갑으로 출금
  function _withdraw(uint _supportId) internal {
    require(_supportInfo[_supportId].endTime <= block.timestamp, "Sponsorship is not over yet.");
    require(_supportInfo[_supportId].balance > 0, "Already withdrawn or 0 balance.");
    payable(_supportInfo[_supportId].addr).transfer(_supportInfo[_supportId].balance);
    _supportInfo[_supportId].balance = 0;
  }

  // 후원 글 정보 조회
  function _getSupportInfo(uint _supportId) internal view returns (SupportInfo memory) {
    return _supportInfo[_supportId];
  }

  // 후원한 내역 조회
  function _getSupportingHistory(address _addr) internal view returns (SupportingHistory[] memory) {
    return _supportingHistory[_addr];
  }

}