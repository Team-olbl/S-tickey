/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from "react";
import { connect, createTicket, getTickets, getWalletInfo, refundTicket, setSupport, donate, withdraw, getSupprtedHistory, getSupprtingHistory } from './service/web3/api'

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

  const _createTicket = async (event : any) => {
    event.preventDefault();
    const fd = new FormData(event.target);

    const data = Object.fromEntries(fd.entries());
    const seatNumber : any = fd.getAll('seatNumber');
    console.log(data, seatNumber);

    const result = await createTicket(Number(data.number), Number(data.gameId), Number(data.stadiumId), Number(data.zoneId), seatNumber, 10**9);
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
                  경기ID<input type="text" name="gameId"/>
                  경기장 ID<input type="text" name="stadiumId" />
                  구역 ID<input type="text" name="zoneId"/>
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
            티켓ID<input type="text" ref={refundRet} />
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
    </div>
  </>

}

export default BlockchainTest;