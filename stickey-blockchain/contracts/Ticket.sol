// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.0 <0.9.0;

// NFT 코인 생성 라이브러리
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./Structs.sol";


contract Ticket is ERC721Enumerable, Structs {

  address admin;

  // 생성자
  // 이름 Stickey, 심볼 TKT (티켓 토큰)
  constructor() ERC721("Stickey", "TKT") {
    admin = msg.sender;
    _ticketPriceInfo[1][1] = 1;

  } 

  // 티켓 생성시 마다 증가하는 카운트 값, SafeMath 적용
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;

  // // 티켓을 가진 사람의 주소 ( 토큰 ID => 지갑 주소 )
  // mapping(uint => address) private _minters;
  
  // 지갑이 가진 티켓 정보 ( 지갑 주소 => 토큰 ID 배열 )
  mapping(address => TicketInfo[]) public _ownedTicket;

  // 티켓 정보 저장 ( 토큰 ID => 티켓 정보 )
  mapping(uint => TicketInfo) private _ticketInfo;

  // 경기 정보 ( 경기 ID => 경기 정보 )
  mapping(uint => GameInfo) private _gameInfo;
  
  // 좌석 예매 정보 ( 경기 ID => 구역 정보 => 좌석 정보 => 상태)
  mapping(uint => mapping(uint => mapping(uint => bool))) _gameSeat;

  // 경기장 별, 구역 별 가격 정보 ( 경기장 ID => 구역 ID => 가격 )
  mapping(uint => mapping(uint => uint)) private _ticketPriceInfo;

  // 아이템 정보 목록, 정보 ( 아이템 ID => 아이템 정보 )
  ItemInfo[] _itemList;
  mapping(uint => ItemInfo) private _itemInfo;

  // 결제 이벤트
  event TicketPayment( address indexed sender, uint gameId, uint amount, uint state, uint date); // state : 1 결제, 2 환불


  function createGame(uint id, uint ticketingTime, uint gameTime) public isAdmin{
    _gameInfo[id] = GameInfo(id, ticketingTime, gameTime);
  }

  function createItem(uint id, string memory name, uint price, uint state) public isAdmin {
    ItemInfo memory item = ItemInfo(id, name, price, state);
    _itemList.push(item);
    _itemInfo[id] = item;
  }

  // 티켓 예매 메소드
  function createTicket(uint number, uint gameId, uint stadiumId, uint areaId, uint seatNum) public payable {
    require(0 < number && number < 5, "Wrong Ticket Number");
    uint price = _ticketPriceInfo[stadiumId][areaId] * number;

    require(msg.value == price, "Wrong price");
    for(uint i = 0; i < number; i++) {
      _tokenIds.increment();
      uint tokenId = _tokenIds.current();
      TicketInfo memory t = TicketInfo(
        tokenId, 
        gameId, 
        areaId, 
        seatNum, 
        1, 
        0, 
        0
      ); 
      _mint(msg.sender, tokenId);
      _ticketInfo[tokenId] = t;
      _ownedTicket[msg.sender].push(t);

      // _minters[tokenId] = msg.sender;  ownerOf 메소드가 대체
    } 

    emit TicketPayment(msg.sender, gameId, price, 1, block.timestamp);
  }

  // 가진 티켓 조회
  function getTicketsByAccounts() public view returns (TicketInfo[] memory) {
    return _ownedTicket[msg.sender];
  }


  modifier isAdmin() {
    require(msg.sender == admin, "Permission Denied");
    _;
  }
}

