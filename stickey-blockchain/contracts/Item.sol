// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract Item {

  // 아이템 정보
  struct ItemInfo {
    uint id;          // 아이템 ID
    string name;      // 아이템 이름
    uint price;           // 아이템 가격
    bool isFilter;        // 필터인지 배경색인지 구분
  }

  // autoIncrement key
  uint private _itemCount;

  // 아이템 정보 목록
  ItemInfo[] private _itemList;

  // 정보 ( 아이템 ID => 아이템 정보 )
  mapping(uint => ItemInfo) private _itemInfo;

  // 아이템 정보 추가
  function _addItem(string memory _name, uint _price, bool _isFilter) internal {
    ++_itemCount;
    ItemInfo memory item = ItemInfo({
      id: _itemCount, 
      name: _name, 
      price: _price,
      isFilter: _isFilter
    });
    _itemList.push(item);
    _itemInfo[_itemCount] = item;
  }

  // 아이템 삭제
  function _deleteItem(uint _id) internal {
    delete _itemInfo[_id];

    for(uint i = 0; i < _itemList.length; i++) {
      if(_itemList[i].id == _id) {
        _itemList[i] = _itemList[_itemList.length - 1];
        _itemList.pop();
        break;
      }
    }
  }

  // 아이템 목록 조회
  function _getItemList() internal view returns (ItemInfo[] memory) {
    return _itemList;
  }

  function _getItemInfo(uint _id) internal view returns (ItemInfo memory) {
    return _itemInfo[_id];
  }


}