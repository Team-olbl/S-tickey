// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

// NFT 코인 생성 라이브러리
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./Structs.sol";


contract Ticket is ERC721Enumerable, Structs {

  address admin;

  // 이름 Stickey, 심볼 TKT (티켓 토큰)
  constructor() ERC721("Stickey", "TKT") {
    admin = msg.sender;
    _ticketPriceInfo[1][1] = 1; // 더미 데이터

  } 

  // 티켓 생성시 마다 증가하는 카운트 값, SafeMath 적용
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;

  // // 티켓을 가진 사람의 주소 ( 토큰 ID => 지갑 주소 )
  // mapping(uint => address) private _minters;
  
  // 지갑이 가진 티켓 정보 ( 지갑 주소 => 토큰 ID 배열 )
  mapping(address => TicketInfo[]) private _ownedTicket;

  // 티켓 정보 저장 ( 토큰 ID => 티켓 정보 )
  mapping(uint => TicketInfo) private _ticketInfo;

  // 경기 정보 ( 경기 ID => 경기 정보 )
  mapping(uint => GameInfo) private _gameInfo;

  // 좌석 환불 정보 ( 경기 ID => 구역 정보 => 좌석 정보 => 이전 환불자 지갑 주소)
  mapping(uint => mapping(uint => mapping(uint => address))) private _refundAddress;

  // 경기장 별, 구역 별 가격 정보 ( 경기장 ID => 구역 ID => 가격 )
  mapping(uint => mapping(uint => uint)) private _ticketPriceInfo;

  // 아이템 정보 목록, 정보 ( 아이템 ID => 아이템 정보 )
  ItemInfo[] private _itemList;
  mapping(uint => ItemInfo) private _itemInfo;

  // 결제 이벤트
  event TicketPayment( address indexed sender, uint gameId, uint amount, uint state, uint date); // state : 1 결제, 2 환불

  // 경기 정보 추가
  function addGame(uint id, uint ticketingTime, uint gameTime) public isAdmin{
    _gameInfo[id] = GameInfo(id, ticketingTime, gameTime);
  }

  // 아이템 정보 추가
  function addItem(uint id, string memory name, uint price, bool isFilter) public isAdmin {
    ItemInfo memory item = ItemInfo(id, name, price, isFilter);
    _itemList.push(item);
    _itemInfo[id] = item;
  }

  // 티켓 예매 메소드
  function mintTicket(uint number, uint gameId, uint stadiumId, uint areaId, uint[] calldata seatNum) public payable {
    require(0 < number && number < 5, "Wrong Ticket Number"); // 티켓의 매수는 1 ~ 4
    uint price = _ticketPriceInfo[stadiumId][areaId]; // 가격 확인, 좌석 가격 * 매수

    require(msg.value == price * number, "Wrong price"); // 가격이 맞지않으면 반려

    for(uint i = 0; i < number; i++) { // 매수만큼 반복
      _tokenIds.increment();
      uint tokenId = _tokenIds.current();

      if(_refundAddress[gameId][areaId][seatNum[i]] != address(0)) {
        payable(_refundAddress[gameId][areaId][seatNum[i]]).transfer(price * 30 / 100);
        delete _refundAddress[gameId][areaId][seatNum[i]];
      }

      TicketInfo memory t = TicketInfo(
        tokenId, 
        gameId,   
        areaId, 
        seatNum[i],
        price,
        0, 
        0
      ); 
      _mint(msg.sender, tokenId); // NFT 토큰 발행
      _ticketInfo[tokenId] = t;
      _ownedTicket[msg.sender].push(t);
    }

    emit TicketPayment(msg.sender, gameId, price, 1, block.timestamp);
  }

  // 티켓 취소 메소드
  function cancleTicket(uint256 tokenId, uint16 gameId) public payable {
    require(ownerOf(tokenId) == msg.sender, "you're not owner of this ticket"); // 티켓 소유자 확인
    // require(_ticketInfo[tokenId].status == 1, "illigal Ticket State"); // 티켓 상태 확인
    
    uint256 nowTime = block.timestamp;
    GameInfo memory g = _gameInfo[gameId];

    require(nowTime <= g.gameTime, "already game started");
    
    uint refundTime = g.gameTime - 3 days; 

    uint refundPrice = _ticketInfo[tokenId].price;

    if(nowTime >= refundTime) {
      refundPrice = refundPrice * 70 / 100;
      _refundAddress[_ticketInfo[tokenId].gameId][_ticketInfo[tokenId].areaId][_ticketInfo[tokenId].seatNum] = msg.sender;
    } 
    payable(msg.sender).transfer(refundPrice);
    delete _ticketInfo[tokenId];
    deleteTicketByAccount(tokenId);
    _burn(tokenId);

    emit TicketPayment(msg.sender, gameId, refundPrice, 2, block.timestamp);
  }

  // 가진 티켓 조회
  function getTicketsByAccount() public view returns (TicketInfo[] memory) {
    return _ownedTicket[msg.sender];
  }

  // 티켓 삭제
  function deleteTicketByAccount(uint tokenId) private {
    for(uint i = 0; i < _ownedTicket[msg.sender].length; i++) {
      if(_ownedTicket[msg.sender][i].tokenId == tokenId){
        _ownedTicket[msg.sender][i] = _ownedTicket[msg.sender][_ownedTicket[msg.sender].length - 1];
        _ownedTicket[msg.sender].pop();
        return; 
      }
    }
  }

  // 아이템 목록 조회
  function getItemList() public view returns (ItemInfo[] memory) {
    return _itemList;
  }

  // 아이템 적용
  function setItemOnTicket(uint tokenId, uint itemId) public payable {
    require(ownerOf(tokenId) == msg.sender, "you're not owner of this ticket"); // 티켓 소유자 확인
    require(msg.value == _itemInfo[itemId].price, "Wrong amount"); 

    // TicketInfo memory t = _ticketInfo[tokenId];
  }

  modifier isAdmin() {
    require(msg.sender == admin, "Permission Denied");
    _;
  }
}

