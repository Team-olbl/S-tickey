// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./Reword.sol";
import "./Ticket.sol";
import "./Support.sol";
import "./Game.sol";
import "./Item.sol";

contract Api is Support, Ticket, Item, Game {

  Reword reword; // ERC20 구현한 Reword 컨트랙트

  // 티켓 조회 호출시 보내는 구조체
  struct TicketDetail {
    uint tokenId;
    uint gameId;
    uint seatNumber;
    uint price;
    uint filterId;
    uint backgroundId;
    string zoneName;
    string stadium;
    string homeTeam;
    string awayTeam;
    string gameImage;
    Category category;
  }

  // 결제 이력 타입
  enum PaymentType { ReserveTicket, RefundTicket, RestRefund, Supporting }

  // 결제 이력
  struct PaymentHistory {
    uint amount;
    uint time;
    TicketPayment ticketPayment;
    string supportName;
    string supportText;
    PaymentType paymentType;
  }

  // 결제 이력 중 예매, 환불
  struct TicketPayment {
    uint gameStartTime;
    uint gameId;
    uint[] seatNumber;
    string homeTeam;
    string awayTeam;
    string stadium;
    string zoneName;
  }

  constructor(address _rewordContractAddress) {
    reword = Reword(_rewordContractAddress);
    reword.setCaller(address(this));
  }

  // 결제 이력
  mapping(address => PaymentHistory[]) private _paymentHistory;

  function _getPaymentHistory(address _addr) internal view returns(PaymentHistory[] memory) {
    return _paymentHistory[_addr];
  }

  function addSupportingHistory(address _addr, uint _amount, string memory _supportName, string memory _text) private {
    TicketPayment memory tp;

    PaymentHistory memory ph = PaymentHistory({
      paymentType : PaymentType.Supporting,
      ticketPayment : tp,
      supportName : _supportName,
      supportText : _text,
      amount : _amount,
      time : block.timestamp
    });
    _paymentHistory[_addr].push(ph);
  }
  
  function addTicketHistory(uint8 _paymentType, address _addr, uint _amount, uint _gameId, uint _zoneId, uint[] memory _seatNumber) private {
    GameInfo memory g = _getGame(_gameId);
    
    PaymentType p;
    if(_paymentType == 0) {
      p = PaymentType.ReserveTicket;
    } else if (_paymentType == 1) {
      p = PaymentType.RefundTicket;
    } else if (_paymentType == 2) {
      p = PaymentType.RestRefund;
    } else {
      return;
    }

    PaymentHistory memory ph = PaymentHistory({
      paymentType : p,
      ticketPayment : TicketPayment({
        gameStartTime : g.gameStartTime,
        stadium : g.stadium,
        zoneName : _getZoneName(_zoneId),
        seatNumber : _seatNumber,
        homeTeam : g.homeTeam,
        awayTeam : g.awayTeam,
        gameId : g.id
      }),
      supportName : "",
      supportText : "",
      amount : _amount,
      time : block.timestamp
    });
    _paymentHistory[_addr].push(ph);
  }

  function _donateWithHistory(uint _supportId, uint _amount, string memory _text) internal {
    _donate(_supportId, _amount, _text);
    addSupportingHistory(msg.sender, _amount, _getSupport(_supportId).name, _text);
  }


   // 티켓 예매
  function _createTicket(uint _number, uint _gameId, uint _stadiumId, uint _zoneId, uint[] calldata _seatNumber) internal {
    require(0 < _number && _number < 5, "Wrong Ticket Number"); // 티켓의 매수는 1 ~ 4
    uint price = _getSeatPrice(_stadiumId, _zoneId); // 가격 확인, 좌석 가격 * 매수
    require(msg.value == price * _number, "Wrong price"); // 가격이 맞지않으면 반려
    for(uint i = 0; i < _number; i++) {
      require(!_getSeatState(_gameId, _zoneId, _seatNumber[i]), "Already Reserve");
    }

    for(uint i = 0; i < _number; i++) { // 매수만큼 반복
      if(_getRefundAddress(_gameId, _zoneId, _seatNumber[i]) != address(0)) {
        payable(_getRefundAddress(_gameId, _zoneId, _seatNumber[i])).transfer(price * 30 / 100);  
        addTicketHistory(2, _getRefundAddress(_gameId, _zoneId, _seatNumber[i]), price * 30 / 100, _gameId, _zoneId, _seatNumber);
        _setRefundAddress(_gameId, _zoneId, _seatNumber[i], address(0));
      }
      _mintTicket(_gameId, _zoneId, _seatNumber[i], price);
      _setSeatState(_gameId, _zoneId, _seatNumber[i], true);
    }
    reword.mintReword(msg.sender, price * _number * 5 / 100); // 0.05% reword 
    addTicketHistory(0, msg.sender, msg.value, _gameId, _zoneId, _seatNumber);
  }


  // 티켓 취소 
  function _refundTicket(uint256 _tokenId) internal {
    require(ownerOf(_tokenId) == msg.sender, "you're not owner of this ticket"); // 티켓 소유자 확인
    
    uint256 nowTime = block.timestamp;
    TicketInfo memory t = _getTicket(_tokenId);
    GameInfo memory g = _getGame(t.gameId);

    require(nowTime < g.gameStartTime, "already game started");
    
    uint refundTime = g.gameStartTime - 3 days; 
    uint refundPrice = t.price;

    require(refundPrice * 5 / 100 <= reword.balanceOf(msg.sender), "you already use Reword Token");
    reword.burnReword(msg.sender, refundPrice * 5 / 100, true);

    if(nowTime >= refundTime) {
      refundPrice = refundPrice * 70 / 100;
      _setRefundAddress(t.gameId, t.zoneId, t.seatNumber, msg.sender);
    } 
    payable(msg.sender).transfer(refundPrice);
    _cancleTicket(_tokenId);
    _setSeatState(t.gameId, t.zoneId, t.seatNumber, false);
    uint[] memory seatNumeber = new uint[](1); // 길이가 1인 동적 배열을 생성
    seatNumeber[0] = t.seatNumber;
    addTicketHistory(1, msg.sender, refundPrice, t.gameId, t.zoneId, seatNumeber);
  }



   // 가진 티켓 조회
  function _getTickets(address _addr) internal view returns (TicketDetail[] memory) {
    uint[] memory ticketIds = _getTicketsByAccount(_addr);
    TicketDetail[] memory tickets = new TicketDetail[](ticketIds.length);

    for(uint i = 0; i < ticketIds.length; i++) {
      TicketInfo memory t = _getTicket(ticketIds[i]);
      GameInfo memory g = _getGame(t.gameId);

      tickets[i] = TicketDetail({
        tokenId: ticketIds[i],
        gameId: t.gameId,
        stadium: g.stadium,
        zoneName: _getZoneName(t.zoneId),
        seatNumber: t.seatNumber,
        price: t.price,
        filterId: t.filterId,
        backgroundId: t.backgroundId,
        category: g.category,
        homeTeam: g.homeTeam,
        awayTeam: g.awayTeam,
        gameImage: g.gameImage
      });
    }
    return tickets;
  }

  // 필터 아이템 적용
  function _setFilterOnTicket(uint _tokenId, uint _itemId, uint _supportId) internal {
    require(ownerOf(_tokenId) == msg.sender, "you're not owner of this ticket"); // 티켓 소유자 확인
    
    ItemInfo memory i = _getFilter(_itemId);
    require(reword.balanceOf(msg.sender) >= i.price, "Wrong amount");  // 아이템 가격 만큼 꿈이 있는지 확인

    _ticketInfo[_tokenId].filterId = _itemId;

    _supportInfo[_supportId].balance += i.price / 2;    
    reword.burnReword(msg.sender, i.price, false);
  }

  // 배경색 아이템 적용
  function _setBackgroundOnTicket(uint _tokenId, uint _itemId, uint _supportId) internal {
    require(ownerOf(_tokenId) == msg.sender, "you're not owner of this ticket"); // 티켓 소유자 확인
    
    ItemInfo memory i = _getBackground(_itemId);
    require(reword.balanceOf(msg.sender) >= i.price, "Wrong amount");  // 아이템 가격 만큼 꿈이 있는지 확인

    _ticketInfo[_tokenId].backgroundId = _itemId;

    _supportInfo[_supportId].balance += i.price / 2;    
    reword.burnReword(msg.sender, i.price, false);
  }

}