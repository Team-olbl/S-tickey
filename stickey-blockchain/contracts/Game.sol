// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract Game {

  enum Category { SOCCER, BASEBALL, BASKETBALL }

  // 경기 정보
  struct GameInfo {
    uint id;              // 경기 ID
    uint bookStartTime;   // 예매 시작 시간
    uint gameStartTime;   // 경기 시작 시간
    string stadium;       // 경기장 이름
    string homeTeam;      // 홈팀 이름
    string awayTeam;      // 원정팀 이름
    Category category;    // 경기 종목
    string poster;        // 포스터 url
  }

  // 경기 정보 ( 경기 ID => 경기 정보 )
  mapping(uint => GameInfo) private _gameInfo;

  // 구역 이름 ( 구역 ID => 구역 이름 )
  mapping(uint => string) private _zoneNameInfo;

  // 좌석 환불 정보 ( 경기 ID => 구역 정보 => 좌석 정보 => 이전 환불자 지갑 주소 )
  mapping(uint => mapping(uint => mapping(uint => address))) private _refundAddress;

  // 경기장 별, 구역 별 가격 정보 ( 경기장 ID => 구역 ID => 가격 )
  mapping(uint => mapping(uint => uint)) private _seatPriceInfo;

  // 좌석 정보 ( 경기 ID => 구역 ID => 좌석번호 => 상태, True : 예약, False : 비어있음 )
  mapping(uint => mapping(uint => mapping(uint => bool))) private _seatState;

  // 경기 정보 설정
  function _setGame(GameInfo memory _game) internal {
    _gameInfo[_game.id] = _game;
  }

  // 경기 정보 조회
  function _getGame(uint _id) internal view returns (GameInfo memory) {
    return _gameInfo[_id];
  }

  // 구역 이름 설정
  function _setZoneName(uint _zoneId, string memory _zoneName) internal {
    _zoneNameInfo[_zoneId] = _zoneName;
  }

  // 구역 이름 조회
  function _getZoneName(uint _zoneId) internal view returns (string memory) {
    return _zoneNameInfo[_zoneId];
  }

  // 경기장 구역 가격 정보 설정
  function _setSeatPrice(uint _stadiumId, uint _zoneId, uint _price) internal {
    _seatPriceInfo[_stadiumId][_zoneId] = _price;
  }

  // 경기장 구역 가격 정보 조회
  function _getSeatPrice(uint _stadiumId, uint _zoneId) internal view returns (uint) {
    return _seatPriceInfo[_stadiumId][_zoneId];
  }

  // 좌석 상태 설정
  function _setSeatState(uint _gameId, uint _zoneId, uint _seatNum, bool _state) internal {
    _seatState[_gameId][_zoneId][_seatNum] = _state;
  }

  // 좌석 상태 조회
  function _getSeatState(uint _gameId, uint _zoneId, uint _seatNum) internal view returns (bool) {
    return _seatState[_gameId][_zoneId][_seatNum];
  } 

  // 환불 주소 설정
  function _setRefundAddress(uint _gameId, uint _zoneId, uint _seatNum, address _addr) internal {
    _refundAddress[_gameId][_zoneId][_seatNum] = _addr;
  }

  // 환불 주소 조회
  function _getRefundAddress(uint _gameId, uint _zoneId, uint _seatNum) internal view returns (address) {
    return _refundAddress[_gameId][_zoneId][_seatNum];
  }



}