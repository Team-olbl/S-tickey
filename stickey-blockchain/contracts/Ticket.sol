// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;


// NFT 코인 생성 라이브러리
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Ticket is ERC721Enumerable{

  // 티켓 정보
  struct TicketInfo {
    uint tokenId;         // 토큰 ID
    uint gameId;          // 경기 ID
    uint zoneId;        // 구역 이름
    uint zoneIdx;
    uint seatNumber;      // 좌석번호
    uint price;           // 가격
    uint filterId;        // 필터 아이디
    uint backgroundId;    // 배경색 아이디
  }

  // 이름 Stickey, 심볼 STT (스티키 토큰)
  constructor() ERC721("Stickey", "STT") {
  } 
  
  // 티켓 생성시 마다 증가하는 카운트 값, SafeMath 적용
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;

  // 티켓 정보 저장 ( 토큰 ID => 티켓 정보 )
  mapping(uint => TicketInfo) internal _ticketInfo;

  // 지갑이 가진 티켓 정보 ( 지갑 주소 => 토큰 ID 배열 )
  mapping(address => uint[]) private _ownedTicket;

  // 티켓 예매 메소드
  function _mintTicket(uint _gameId, uint _zoneId, uint _zoneIdx, uint _seatNumber, uint _price) internal returns (uint) {
    _tokenIds.increment();
    uint _tokenId = _tokenIds.current();

    TicketInfo memory t = TicketInfo({
      tokenId: _tokenId, 
      gameId: _gameId,   
      zoneId: _zoneId, 
      zoneIdx: _zoneIdx,
      seatNumber: _seatNumber,
      price: _price,
      filterId: 0, 
      backgroundId: 0
    }); 
    _mint(msg.sender, _tokenId); // NFT 토큰 발행
    _ticketInfo[_tokenId] = t;
    _ownedTicket[msg.sender].push(_tokenId);

    return _tokenId;
  }

  // 티켓 취소 메소드
  function _cancleTicket(uint256 _tokenId)  internal {
    delete _ticketInfo[_tokenId];
    deleteTicketByAccount(_tokenId);
    _burn(_tokenId);
  }

  // 티켓 삭제
  function deleteTicketByAccount(uint _tokenId) private {
    for(uint i = 0; i < _ownedTicket[msg.sender].length; i++) {
      if(_ownedTicket[msg.sender][i] == _tokenId){
        _ownedTicket[msg.sender][i] = _ownedTicket[msg.sender][_ownedTicket[msg.sender].length - 1];
        _ownedTicket[msg.sender].pop();
        return; 
      }
    }
  }

  // 가진 티켓 토큰 조회
  function _getTicketsByAccount(address _addr) internal view returns (uint[] memory) {
    return _ownedTicket[_addr];
  }

  // 티켓 정보 조회
  function _getTicket(uint _tokenId) internal view returns (TicketInfo memory) {
    return _ticketInfo[_tokenId];
  }

}