// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract Item {

  // 아이템 정보
  struct ItemInfo {
    uint id;          // 아이템 ID
    uint price;           // 아이템 가격
    string name;      // 아이템 이름
  }

  // autoIncrement key
  uint private _filterCount;
  uint private _backgroundCount;

  // 아이템 정보 목록
  ItemInfo[] private _filterList;
  ItemInfo[] private _backgroundList;

  // 정보 ( 아이템 ID => 아이템 정보 )
  mapping(uint => ItemInfo) private _filterInfo;
  mapping(uint => ItemInfo) private _backgroundInfo;

  // 필터 아이템 추가
  function _addFilter(string memory _name, uint _price) internal {
    ++_filterCount;
    ItemInfo memory item = ItemInfo({
      id: _filterCount, 
      name: _name, 
      price: _price
    });
    _filterList.push(item);
    _filterInfo[_filterCount] = item;
  }

  // 배경색 아이템 추가
  function _addBackground(string memory _name, uint _price) internal {
    ++_backgroundCount;
    ItemInfo memory item = ItemInfo({
      id: _backgroundCount, 
      name: _name, 
      price: _price
    });
    _backgroundList.push(item);
    _backgroundInfo[_backgroundCount] = item;
  }

  // 필터 아이템 삭제
  function _deleteFilter(uint _id) internal {
    delete _filterInfo[_id];

    for(uint i = 0; i < _filterList.length; i++) {
      if(_filterList[i].id == _id) {
        _filterList[i] = _filterList[_filterList.length - 1];
        _filterList.pop();
        break;
      }
    }
  }

  // 배경색 아이템 삭제
  function _deleteBackground(uint _id) internal {
    delete _backgroundInfo[_id];

    for(uint i = 0; i < _filterList.length; i++) {
      if(_backgroundList[i].id == _id) {
        _backgroundList[i] = _backgroundList[_backgroundList.length - 1];
        _backgroundList.pop();
        break;
      }
    }
  }

  // 아이템 목록 조회
  function _getItemList() internal view returns (ItemInfo[] memory, ItemInfo[] memory) {
    return (_filterList, _backgroundList);
  }

  // 아이템 정보 조회
  function _getFilter(uint _id) internal view returns (ItemInfo memory) {
    return _filterInfo[_id];
  }

  // 아이템 정보 조회
  function _getBackground(uint _id) internal view returns (ItemInfo memory) {
    return _backgroundInfo[_id];
  }
}