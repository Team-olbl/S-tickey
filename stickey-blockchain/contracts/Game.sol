// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract Game {

  // 경기 정보
  struct GameInfo {
    uint id;          // 경기 ID
    uint bookStartTime;   // 예매 시작 시간
    uint gameStartTime;   // 경기 시작 시간
    string stadium;       // 경기장 이름
    string homeTeam;      // 홈팀 이름
    string awayTeam;      // 원정팀 이름
    string poster;        // 포스터 url
  }

  // 경기 정보 ( 경기 ID => 경기 정보 )
  mapping(uint => GameInfo) private _gameInfo;

  // 좌석 환불 정보 ( 경기 ID => 구역 정보 => 좌석 정보 => 이전 환불자 지갑 주소 )
  mapping(uint => mapping(uint => mapping(uint => address))) private _refundAddress;

  // 경기장 별, 구역 별 가격 정보 ( 경기장 ID => 구역 ID => 가격 )
  mapping(uint => mapping(uint => uint)) private _seatPriceInfo;

  // 좌석 정보 ( 경기 ID => 구역 ID => 좌석번호 => 상태, True : 예약, False : 비어있음 )
  mapping(uint => mapping(uint => mapping(uint => bool))) private _seatState;

  // 경기 정보 추가
  function _addGame(GameInfo memory _game) internal {
    _gameInfo[_game.id] = _game;
  }




}