// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

// NFT 코인 생성 라이브러리
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./Reword.sol";
import "./Structs.sol";

contract Stickey is ERC721Enumerable, Structs {

  address admin;
  Reword reword;

  // 이름 Stickey, 심볼 TKT (티켓 토큰)
  constructor(address _rewordContractAddress) ERC721("Stickey", "TKT") {
    reword = Reword(_rewordContractAddress);
    reword.setTicketCaller(address(this));
    admin = msg.sender;
    _ticketPriceInfo[1][1] = 10 ** 9; // 더미 데이터
    addGame(1, block.timestamp);
    addGame(2, block.timestamp + 3 days);
    addGame(3, block.timestamp + 5 days);


    addItem(1, unicode"아이템1", 1000, false);
    addItem(2, unicode"아이템2", 1000, false);
    addItem(3, unicode"엄청 비싼 아이템", 500000, true);
    addItem(4, unicode"필터 아이템1", 1000, true);
    addItem(5, unicode"필터 아이템2", 1000, true);
    
  } 

  // 티켓 생성시 마다 증가하는 카운트 값, SafeMath 적용
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;

  // // 티켓을 가진 사람의 주소 ( 토큰 ID => 지갑 주소 )
  // mapping(uint => address) private _minters;
  
  // 지갑이 가진 티켓 정보 ( 지갑 주소 => 토큰 ID 배열 )
  mapping(address => uint[]) private _ownedTicket;

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

  // 후원 글 정보 ( 후원 글 ID => 후원 글 정보)
  mapping(uint => SupportInfo) public _supportInfo;

  // 결제 이벤트
  event TicketPayment( address indexed sender, uint gameId, uint amount, uint state, uint date); // state : 1 결제, 2 환불

  // 경기 정보 추가
  function addGame(uint id, uint bookStartTime,uint gameStartTime, string calldata stadium,string calldata homeTeam, string calldata awayTeam) public isAdmin{
    _gameInfo[id] = GameInfo(id, bookStartTime, gameStartTime, stadium, homeTeam, awayTeam);
  }

  // 아이템 정보 추가
  function addItem(uint id, string memory name, uint price, bool isFilter) public isAdmin {
    ItemInfo memory item = ItemInfo(id, name, price, isFilter);
    _itemList.push(item);
    _itemInfo[id] = item;
  }

  // 후원 글 등록
  function addSupport(uint id, address addr, uint endTime) public isAdmin {
    _supportInfo[id] = SupportInfo(id, addr, 0, endTime);
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
      _ownedTicket[msg.sender].push(tokenId);
    }

    reword.mintReword(msg.sender, price * number * 5 / 100); // 0.05% reword 

    emit TicketPayment(msg.sender, gameId, price, 1, block.timestamp);
  }

  // 티켓 취소 메소드
  function cancleTicket(uint256 tokenId) public payable {
    require(ownerOf(tokenId) == msg.sender, "you're not owner of this ticket"); // 티켓 소유자 확인
    
    
    uint256 nowTime = block.timestamp;
    GameInfo memory g = _gameInfo[_ticketInfo[tokenId].gameId];

    require(nowTime <= g.gameStartTime, "already game started");
    
    uint refundTime = g.gameStartTime - 3 days; 

    uint refundPrice = _ticketInfo[tokenId].price;

    require(refundPrice * 5 / 100 <= reword.balanceOf(msg.sender), "you already use Reword Token");
    reword.burnReword(msg.sender, refundPrice * 5 / 100);

    if(nowTime >= refundTime) {
      refundPrice = refundPrice * 70 / 100;
      _refundAddress[_ticketInfo[tokenId].gameId][_ticketInfo[tokenId].areaId][_ticketInfo[tokenId].seatNum] = msg.sender;
    } 
    payable(msg.sender).transfer(refundPrice);
    delete _ticketInfo[tokenId];
    deleteTicketByAccount(tokenId);
    _burn(tokenId);

    emit TicketPayment(msg.sender, g.gameId, refundPrice, 2, block.timestamp);
  }

  // 가진 티켓 조회
  function getTicketsByAccount() public view returns (Ticket[] memory) {
    uint[] memory tickets = _ownedTicket[msg.sender];
    Ticket[] memory ret = new Ticket[](tickets.length);

    for(uint i = 0; i < tickets.length; i++) {
      ret[i] = Ticket(_ticketInfo[tickets[i]], _gameInfo[_ticketInfo[tickets[i]].gameId]);
    }

    return ret;
  }

  // 티켓 삭제
  function deleteTicketByAccount(uint tokenId) private {
    for(uint i = 0; i < _ownedTicket[msg.sender].length; i++) {
      if(_ownedTicket[msg.sender][i] == tokenId){
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
  function setItemOnTicket(uint tokenId, uint itemId, uint supportId) public {
    require(ownerOf(tokenId) == msg.sender, "you're not owner of this ticket"); // 티켓 소유자 확인
    
    ItemInfo memory i = _itemInfo[itemId];
    require(reword.balanceOf(msg.sender) >= i.price, "Wrong amount");  // 아이템 가격 만큼 꿈이 있는지 확인

    if(i.isFilter) {
      _ticketInfo[tokenId].filterId = itemId;
    } else {
      _ticketInfo[tokenId].backGroundId = itemId;
    }

    _supportInfo[supportId].balance += i.price / 2;    
    reword.burnReword(msg.sender, i.price);
  }

  // 후원
  function donate(uint supportId) public payable {
    require(_supportInfo[supportId].endTime > block.timestamp, "Sponsorship has ended.");
    _supportInfo[supportId].balance += msg.value;
  }
  
  // 후원금 단체 지갑으로 출금
  function withdraw(uint supportId) public payable {
    require(_supportInfo[supportId].endTime <= block.timestamp, "Sponsorship is not over yet.");
    require(_supportInfo[supportId].balance > 0, "Already withdrawn or 0 balance.");
    payable(_supportInfo[supportId].addr).transfer(_supportInfo[supportId].balance);
    _supportInfo[supportId].balance = 0;
  }

  modifier isAdmin() {
    require(msg.sender == admin, "Permission Denied");
    _;
  }
}