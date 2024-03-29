/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from "react";
import { connect, createTicket, getTickets, getWalletInfo, refundTicket, setSupport, donate, withdraw, getSupprtedHistory, getSupprtingHistory, getPaymentHistory, getRewordHistory, getItemList, addFilter, addBackground, deleteBackground, deleteFilter, setFilterOnTicket, setBackgroundOnTicket, setGame, setSeatPrice, setZoneName, getSeatState } from './service/web3/api'

const BlockchainTest = () => {

  const refundRet = useRef<HTMLInputElement>(null);

  useEffect(() => {
    connect();
  }, []);

  const _connect = () => {
    connect();
  }

  const _getWalletInfo = async () => {
    const result = await getWalletInfo();
    console.log(result);
    alert("실행완료");
  }

  const _createTicket = async (event: any) => {
    event.preventDefault();
    const fd = new FormData(event.target);

    const data = Object.fromEntries(fd.entries());
    const seatNumber: any = fd.getAll('seatNumber');
    const price = Number(prompt("티켓가격"));

    const result = await createTicket(Number(data.number), Number(data.gameId), Number(data.stadiumId), Number(data.zoneId), seatNumber, price);
    console.log(result);
    alert("실행완료");
  }
  
  const _getTickets = async () => {
    const result = await getTickets();
    console.log(result);
    alert("실행완료");
  }

  const _refundTicket = async () => {
    refundTicket(Number(refundRet.current!.value));
  }

  const _setSupport = async () => {
    const id = prompt("후원글 아이디");
    const name = prompt("단체이름")
    const address = prompt("지갑주소");
    if (!id || !name || !address) {
      alert("등록 취소")
      return;
    }
    alert("후원종료시간은 2분 뒤 입니다.");
    const endTime = Math.floor(new Date().getTime() / 1000) + 120;
    setSupport(Number(id), name!, address!, endTime);
  }

  const _donate = async () => {
    const id = prompt("후원글 아이디");
    const value = prompt("후원할 양");
    const text = prompt("남길 글");
    if (!id || !value || !text) {
      alert("등록 취소")
      return;
    }
    donate(Number(id), text!, Number(value));
  }

  const _withdraw = async () => {
    const id = prompt("후원글 아이디");
    withdraw(Number(id));
  }

  const _getSupprtedHistory = async () => {
    const id = prompt("후원글 아이디");
    const result = await getSupprtedHistory(Number(id));
    console.log(result);
  }

  const _getSupprtingHistory = async () => {
    const result = await getSupprtingHistory();
    console.log(result);
  }

  const _getPaymentHistory = async () => {
    const result = await getPaymentHistory();
    console.log(result);
  }

  const _getRewordHistory = async () => {
    const result = await getRewordHistory();
    console.log(result);
  }

  const _getItemList = async () => {
    const result = await getItemList();
    console.log(result);
  }

  const _addFilter = async () => {
    const name = prompt("필터 이름");
    const price = prompt("필터 가격");
    if (!name || !price) {
      alert("등록 취소");
      return;
    }
    const result = await addFilter(name, Number(price));
    console.log(result);
  }

  const _addBackground = async () => {
    const name = prompt("배경색 이름");
    const price = prompt("배경색 가격");
    if (!name || !price) {
      alert("등록 취소");
      return;
    }
    const result = await addBackground(name, Number(price));
    console.log(result);
  }

  const _setFilterOnTicket = async () => {
    const tokenId = prompt("티켓 ID");
    const itemId = prompt("적용할 필터 ID");
    const supportID = prompt("후원할 후원글 (API로 받아올것)");
    if (!tokenId || !itemId || !supportID) {
      alert("등록취소");
      return;
    }
    const result = await setFilterOnTicket(Number(tokenId), Number(itemId), Number(supportID));
    console.log(result);
  }

  const _setBackgroundOnTicket = async () => {
    const tokenId = prompt("티켓 ID");
    const itemId = prompt("적용할 배경색 ID");
    const supportID = prompt("후원할 후원글 (API로 받아올것)");
    if (!tokenId || !itemId || !supportID) {
      alert("등록취소");
      return;
    }
    const result = await setBackgroundOnTicket(Number(tokenId), Number(itemId), Number(supportID));
    console.log(result);
  }

  const _deleteFilter = async () => {
    const itemId = prompt("삭제할 필터 ID")
    if (!itemId) {
      alert("등록 취소");
      return;
    }
    const result = await deleteFilter(Number(itemId));
    console.log(result);
  }

  const _deleteBackground = async () => {
    const itemId = prompt("삭제할 배경색 ID")
    if (!itemId) {
      alert("등록 취소");
      return;
    }
    const result = await deleteBackground(Number(itemId));
    console.log(result);
  }


  const _setGame = async () => {
    const arr = [];
    arr.push(prompt("경기 ID"));
    arr.push(prompt("예매 시작 시간"));
    arr.push(prompt("경기 시작 시간"));
    arr.push(prompt("경기장 이름"));
    arr.push(prompt("홈팀 이름"));
    arr.push(prompt("원정팀 이름"));
    arr.push(prompt("종목 {SOCCER, BASEBALL, BASKETBALL"));
    arr.push(prompt("게임 이미지"));
    console.log(arr);
    if (arr.includes("")) {
      console.log(arr);
      alert("취소");
      return;
    } 
    arr[1] = Math.floor(new Date(arr[1]!.toString()).getTime() / 1000);
    arr[2] = Math.floor(new Date(arr[2]!.toString()).getTime() / 1000);
    
    const result = await setGame(Number(arr[0]), arr[1], arr[2], arr[3]!.toString(), arr[4]!.toString(), arr[5]!.toString(), arr[6]!.toString(), arr[7]!.toString());
    console.log(result);
  }

    const _setSeatPrice = async () => {
      const stadiumId = prompt("경기장ID");
      const zoneId = prompt("구역 ID");
      const price = prompt("가격");
      if (!stadiumId || !zoneId || !price) {
        alert("취소");
        return;
      }
      const result = await setSeatPrice(Number(stadiumId), Number(zoneId), Number(price));
      console.log(result);
    }

    const _setZoneName = async () => {
      const zoneId = prompt("구역 ID");
      const zoneName = prompt("구역 이름");
      if (!zoneId || !zoneName) {
        alert("등록 취소");
        return;
      }
      const result = await setZoneName(Number(zoneId), zoneName);
      console.log(result);
    }

    const _getSeatState = async () => {
      const gameId = prompt("경기 ID");
      const zoneId = prompt("구역 ID");
      const seatNumber = prompt("좌석 번호");
      if (!gameId || !zoneId || !seatNumber) {
        alert("취소");
        return;
      }
      const result = await getSeatState(Number(gameId), Number(zoneId), Number(seatNumber));
      console.log(result);
    }

  
    return <>
      <div className="text-black flex flex-col items-center w-full">

        <div className="text-center bg-amber-600 w-full">
          <div className="text-[20px] underline underline-offset-2">지갑 관련 API</div>
          <div className="flex gap-5">
            <button type="button" onClick={_connect} >
              메타마스크 지갑연결
            </button>
            <button type="button" onClick={_getWalletInfo} >
              지갑 정보 확인
            </button>
          </div>
        </div>

        <div className="text-center bg-green-400 w-full">
          <div className="text-[20px] underline underline-offset-2">예매 관련 API</div>
          <div className="flex gap-5 w-full">
            <div className="flex-row items-center justify-center w-full">
              <div className="w-full">
                <div >
                  <form action="" onSubmit={_createTicket} className="flex flex-col gap-1 w-full items-center">
                    티켓 매수<input type="text" name="number" />
                    경기ID<input type="text" name="gameId" />
                    경기장 ID<input type="text" name="stadiumId" />
                    구역 ID<input type="text" name="zoneId" />
                    좌석 번호
                    <select name="seatNumber" id="" size={2} multiple>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                    </select>
                    <button>예매하기</button>
                  </form>
                </div>
              </div>
            </div>
            <div>
              <button onClick={_getTickets}>내 티켓 확인</button>
            </div>
            <div className="w-[20%]">
              <div>티켓 환불</div>
              티켓ID<input type="text" className="w-full" ref={refundRet} />
              <button onClick={_refundTicket}>환불하기</button>
            </div>
          </div>
        </div>

        <div className="text-center bg-red-200 w-full">
          <div className="text-[20px] underline underline-offset-2">후원 관련 API</div>
          <div className="flex gap-5">
            <button type="button" onClick={_setSupport} >
              후원글 등록
            </button>
            <button type="button" onClick={_donate} >
              후원
            </button>
            <button type="button" onClick={_withdraw} >
              후원글 수령
            </button>
            <button type="button" onClick={_getSupprtedHistory} >
              후원받은 이력 보기
            </button>
            <button type="button" onClick={_getSupprtingHistory} >
              후원한 이력 보기
            </button>
          </div>
        </div>
        <div className="text-center bg-sky-200 w-full">
          <div className="text-[20px] underline underline-offset-2">마이페이지 관련 API</div>
          <div className="flex gap-5">
            <button type="button" onClick={_getPaymentHistory} >
              결제이력 조회
            </button>
            <button type="button" onClick={_getRewordHistory} >
              꿈 증감 내역 조회
            </button>
          </div>
        </div>
        <div className="text-center bg-indigo-400 w-full">
          <div className="text-[20px] underline underline-offset-2">아이템 관련 API</div>
          <div className="flex gap-5">
            <button type="button" onClick={_getItemList} >
              아이템 조회
            </button>
            <button type="button" onClick={_setFilterOnTicket} >
              필터 아이템 적용
            </button>
            <button type="button" onClick={_addFilter} >
              필터 아이템 추가
            </button>
            <button type="button" onClick={_deleteFilter} >
              필터 아이템 삭제
            </button>
            <button type="button" onClick={_setBackgroundOnTicket} >
              배경색 아이템 적용
            </button>
            <button type="button" onClick={_addBackground} >
              배경색 아이템 추가
            </button>
            <button type="button" onClick={_deleteBackground} >
              배경색 아이템 삭제
            </button>
          </div>
        </div>
        <div className="text-center bg-pink-400 w-full">
          <div className="text-[20px] underline underline-offset-2">경기 관련 API</div>
          <div className="flex gap-5">
            <button type="button" onClick={_setGame} >
              경기 등록
            </button>
            <button type="button" onClick={_setSeatPrice} >
              경기장 구역 가격 설정
            </button>
            <button type="button" onClick={_setZoneName} >
              구역 이름 설정
            </button>
            <button type="button" onClick={_getSeatState} >
              좌석 상태 조회
            </button>
          </div>
        </div>
      </div>
    </>
}

export default BlockchainTest;