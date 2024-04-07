/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef } from 'react';
import {
  connect,
  getTickets,
  getWalletInfo,
  refundTicket,
  setSupport,
  donate,
  withdraw,
  getSupprtedHistory,
  getPaymentHistory,
  getRewordHistory,
  getItemList,
  addFilter,
  addBackground,
  deleteBackground,
  deleteFilter,
  setFilterOnTicket,
  setBackgroundOnTicket,
  setGame,
  setSeatPrice,
  setZoneName,
  getSeatState,
} from '../../service/web3/api';
import { useProfile } from '../../hooks/Profile/useProfile';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const BlockchainTest = () => {
  const { useGetProfile } = useProfile();
  const { data: profileRes, isSuccess } = useGetProfile();
  const refundRet = useRef<HTMLInputElement>(null);

  if (isSuccess) {
    if (profileRes.data.role !== 'ADMIN') {
      toast.warn('잘못된 접근입니다.');
      return <Navigate to="/home"></Navigate>;
    }
  }

  const _connect = () => {
    connect();
  };

  const _getWalletInfo = async () => {
    const result = await getWalletInfo();
    console.log(result);
    alert('실행완료');
  };

  const _createTicket = async (event: any) => {
    event.preventDefault();
    // const fd = new FormData(event.target);

    // const data = Object.fromEntries(fd.entries());
    // const seatNumber: any = fd.getAll('seatNumber');
    // const price = Number(prompt('티켓가격'));

    // const result = await createTicket(
    //   Number(data.number),
    //   Number(data.gameId),
    //   Number(data.stadiumId),
    //   Number(data.zoneId),
    //   seatNumber,
    //   price,
    // );
    // console.log(result);
    // alert('실행완료');
  };

  const _getTickets = async () => {
    const result = await getTickets();
    console.log(result);
    alert('실행완료');
  };

  const _refundTicket = async () => {
    refundTicket(Number(refundRet.current!.value));
  };

  const _setSupport = async () => {
    const id = prompt('후원글 아이디');
    const name = prompt('단체이름');
    const address = prompt('지갑주소');
    const end_Time = prompt('종료 시간');
    if (!id || !name || !address || !end_Time) {
      alert('등록 취소');
      return;
    }
    const endTime = Math.floor(new Date(end_Time!.toString()).getTime() / 1000);
    setSupport(Number(id), name!, address, endTime);
  };

  const _donate = async () => {
    const id = prompt('후원글 아이디');
    const value = prompt('후원할 양');
    const text = prompt('남길 글');
    if (!id || !value || !text) {
      alert('등록 취소');
      return;
    }
    donate(Number(id), text!, Number(value));
  };

  const _withdraw = async () => {
    const id = prompt('후원글 아이디');
    withdraw(Number(id));
  };

  const _getSupprtedHistory = async () => {
    const id = prompt('후원글 아이디');
    const result = await getSupprtedHistory(Number(id));
    console.log(result);
  };

  const _getPaymentHistory = async () => {
    const result = await getPaymentHistory();
    console.log(result);
  };

  const _getRewordHistory = async () => {
    const result = await getRewordHistory();
    console.log(result);
  };

  const _getItemList = async () => {
    const result = await getItemList();
    console.log(result);
  };

  const _addFilter = async () => {
    const id = prompt('필터 ID');
    const price = prompt('필터 가격');
    if (!id || !price) {
      alert('등록 취소');
      return;
    }
    const result = await addFilter(Number(id), Number(price));
    console.log(result);
  };

  const _addBackground = async () => {
    const id = prompt('배경색 ID');
    const price = prompt('배경색 가격');
    if (!id || !price) {
      alert('등록 취소');
      return;
    }
    const result = await addBackground(Number(id), Number(price));
    console.log(result);
  };

  const _setFilterOnTicket = async () => {
    const tokenId = prompt('티켓 ID');
    const itemId = prompt('적용할 필터 ID');
    const supportID = prompt('후원할 후원글 (API로 받아올것)');
    if (!tokenId || !itemId || !supportID) {
      alert('등록취소');
      return;
    }
    const result = await setFilterOnTicket(Number(tokenId), Number(itemId), Number(supportID));
    console.log(result);
  };

  const _setBackgroundOnTicket = async () => {
    const tokenId = prompt('티켓 ID');
    const itemId = prompt('적용할 배경색 ID');
    const supportID = prompt('후원할 후원글 (API로 받아올것)');
    if (!tokenId || !itemId || !supportID) {
      alert('등록취소');
      return;
    }
    const result = await setBackgroundOnTicket(Number(tokenId), Number(itemId), Number(supportID));
    console.log(result);
  };

  const _deleteFilter = async () => {
    const itemId = prompt('삭제할 필터 ID');
    if (!itemId) {
      alert('등록 취소');
      return;
    }
    const result = await deleteFilter(Number(itemId));
    console.log(result);
  };

  const _deleteBackground = async () => {
    const itemId = prompt('삭제할 배경색 ID');
    if (!itemId) {
      alert('등록 취소');
      return;
    }
    const result = await deleteBackground(Number(itemId));
    console.log(result);
  };

  const _setGame = async () => {
    const arr = [];
    arr.push(prompt('경기 ID'));
    arr.push(prompt('예매 시작 시간'));
    arr.push(prompt('경기 시작 시간'));
    arr.push(prompt('경기장 이름'));
    arr.push(prompt('홈팀 이름'));
    arr.push(prompt('원정팀 이름'));
    arr.push(prompt('종목 {SOCCER, BASEBALL, BASKETBALL'));
    arr.push(prompt('게임 이미지'));
    console.log(arr);
    if (arr.includes('')) {
      console.log(arr);
      alert('취소');
      return;
    }
    arr[1] = Math.floor(new Date(arr[1]!.toString()).getTime() / 1000);
    arr[2] = Math.floor(new Date(arr[2]!.toString()).getTime() / 1000);

    const result = await setGame(
      Number(arr[0]),
      arr[1],
      arr[2],
      arr[3]!.toString(),
      arr[4]!.toString(),
      arr[5]!.toString(),
      arr[6]!.toString(),
      arr[7]!.toString(),
    );
    console.log(result);
  };

  const _setSeatPrice = async () => {
    const stadiumId = prompt('경기장ID');
    const zoneId = prompt('구역 ID');
    const price = prompt('가격');
    if (!stadiumId || !zoneId || !price) {
      alert('취소');
      return;
    }
    const result = await setSeatPrice(Number(stadiumId), Number(zoneId), Number(price));
    console.log(result);
  };

  const _setZoneName = async () => {
    const zoneId = prompt('구역 ID');
    const zoneName = prompt('구역 이름');
    if (!zoneId || !zoneName) {
      alert('등록 취소');
      return;
    }
    const result = await setZoneName(Number(zoneId), zoneName);
    console.log(result);
  };

  const _getSeatState = async () => {
    const gameId = prompt('경기 ID');
    const zoneId = prompt('구역 ID');
    const seatNumber = prompt('좌석 번호');
    if (!gameId || !zoneId || !seatNumber) {
      alert('취소');
      return;
    }
    const result = await getSeatState(Number(gameId), Number(zoneId), Number(seatNumber));
    console.log(result);
  };

  const execute = () => {
    const games = [
      [
        '1',
        '2024-04-02 16:50:00.974000',
        '2024-04-13 14:00:00.974000',
        '서울월드컵경기장',
        '포항 스틸러스',
        'FC 서울',
        'SOCCER',
        'https://d3rz04d93vngvv.cloudfront.net/game/profile/2024_04_02_143128_서울포항.jpg',
      ],
      [
        '13',
        '2024-04-02 16:50:38.663000',
        '2024-04-03 17:00:38.663000',
        '서울월드컵경기장',
        'FC 서울',
        '포항 스틸러스',
        'SOCCER',
        'https://d3rz04d93vngvv.cloudfront.net/game/profile/2024_04_02_153781_화면 캡처 2024-03-25 103903.png',
      ],
      [
        '17',
        '2024-04-08 18:00:00.812000',
        '2024-04-10 19:30:51.812000',
        '사직야구장',
        '두산 베어스',
        '롯데 자이언츠',
        'BASEBALL',
        'https://d3rz04d93vngvv.cloudfront.net/game/profile/2024_04_02_161211_KBO.jpg',
      ],
      [
        '18',
        '2024-04-02 17:00:00.663000',
        '2024-04-16 16:30:00.663000',
        'DGB대구은행파크',
        '대구 FC',
        '인천 UTD',
        'SOCCER',
        'https://d3rz04d93vngvv.cloudfront.net/game/profile/2024_04_02_162203_대구인천.jpg',
      ],
      [
        '19',
        '2024-04-03 17:00:00.663000',
        '2024-04-07 14:00:00.663000',
        '전주월드컵경기장',
        '전북 현대 모터스',
        '강원 FC',
        'SOCCER',
        'https://d3rz04d93vngvv.cloudfront.net/game/profile/2024_04_02_163212_전북강원.jpg',
      ],
      [
        '21',
        '2024-04-03 17:00:00.663000',
        '2024-04-07 16:30:00.663000',
        '대전월드컵경기장',
        '대전 하나',
        '포항 스틸러스',
        'SOCCER',
        'https://d3rz04d93vngvv.cloudfront.net/game/profile/2024_04_03_023029_대전포항.jpg',
      ],
      [
        '22',
        '2024-04-03 17:00:00.663000',
        '2024-04-07 14:00:00.663000',
        'DGB대구은행파크',
        '대구 FC',
        'FC 서울',
        'SOCCER',
        'https://d3rz04d93vngvv.cloudfront.net/game/profile/2024_04_03_023758_대구서울.png',
      ],
      [
        '23',
        '2024-04-03 17:00:00.663000',
        '2024-04-06 16:30:00.663000',
        '김천종합운동장',
        '김천 상무 프로축구단',
        '광주 FC',
        'SOCCER',
        'https://d3rz04d93vngvv.cloudfront.net/game/profile/2024_04_03_024009_김천광주.png',
      ],
      [
        '24',
        '2024-04-03 17:00:00.663000',
        '2024-04-06 14:00:00.663000',
        '울산문수축구경기장',
        '울산 HD FC',
        '수원 FC',
        'SOCCER',
        'https://d3rz04d93vngvv.cloudfront.net/game/profile/2024_04_03_024600_울산수원.jpg',
      ],
    ];

    const supports = [
      ['2', '드림축구재단', '0x7175e6a27A06634bf866d56696A24586d8Fb97a1', '2024-04-15 23:59:59.000000'],
      ['3', '드림축구재단', '0x7175e6a27A06634bf866d56696A24586d8Fb97a1', '2024-04-01 23:59:59.000000'],
      ['4', '경상북도체육회', '0x7175e6a27A06634bf866d56696A24586d8Fb97a1', '2024-04-13 23:59:59.000000'],
      ['5', '한국대학스포츠협의회', '0x7175e6a27A06634bf866d56696A24586d8Fb97a1', '2024-04-13 23:59:59.000000'],
      ['6', '드림축구재단', '0x7175e6a27A06634bf866d56696A24586d8Fb97a1', '2024-04-08 23:59:59.000000'],
    ];

    (async () => {
      for (let i = 0; i < games.length; i++) {
        const game = games[i];
        const booktime = Math.floor(new Date(game[1]!.toString()).getTime() / 1000);
        const gametime = Math.floor(new Date(game[2]!.toString()).getTime() / 1000);

        await setGame(Number(game[0]), booktime, gametime, game[3], game[4], game[5], game[6], game[7]);
      }

      for (let i = 0; i < supports.length; i++) {
        const support = supports[i];
        const et = Math.floor(new Date(support[3]!.toString()).getTime() / 1000);
        await setSupport(Number(support[0]), support[1], support[2], et);
      }
    })();
  };

  return (
    <>
      {isSuccess && (
        <div className="text-black flex flex-col items-center w-full">
          <div className="text-center bg-amber-600 w-full">
            <div className="text-[20px] underline underline-offset-2">지갑 관련 API</div>
            <div className="flex gap-5">
              <button type="button" onClick={_connect}>
                메타마스크 지갑연결
              </button>
              <button type="button" onClick={_getWalletInfo}>
                지갑 정보 확인
              </button>
            </div>
          </div>

          <div className="text-center bg-green-400 w-full">
            <div className="text-[20px] underline underline-offset-2">예매 관련 API</div>
            <div className="flex gap-5 w-full">
              <div className="flex-row items-center justify-center w-full">
                <div className="w-full">
                  <div>
                    <form action="" onSubmit={_createTicket} className="flex flex-col gap-1 w-full items-center">
                      티켓 매수
                      <input type="text" name="number" />
                      경기ID
                      <input type="text" name="gameId" />
                      경기장 ID
                      <input type="text" name="stadiumId" />
                      구역 ID
                      <input type="text" name="zoneId" />
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
                티켓ID
                <input type="text" className="w-full" ref={refundRet} />
                <button onClick={_refundTicket}>환불하기</button>
              </div>
            </div>
          </div>

          <div className="text-center bg-red-200 w-full">
            <div className="text-[20px] underline underline-offset-2">후원 관련 API</div>
            <div className="flex gap-5">
              <button type="button" onClick={_setSupport}>
                후원글 등록
              </button>
              <button type="button" onClick={_donate}>
                후원
              </button>
              <button type="button" onClick={_withdraw}>
                후원글 수령
              </button>
              <button type="button" onClick={_getSupprtedHistory}>
                후원받은 이력 보기
              </button>
            </div>
          </div>
          <div className="text-center bg-sky-200 w-full">
            <div className="text-[20px] underline underline-offset-2">마이페이지 관련 API</div>
            <div className="flex gap-5">
              <button type="button" onClick={_getPaymentHistory}>
                결제이력 조회
              </button>
              <button type="button" onClick={_getRewordHistory}>
                꿈 증감 내역 조회
              </button>
            </div>
          </div>
          <div className="text-center bg-indigo-400 w-full">
            <div className="text-[20px] underline underline-offset-2">아이템 관련 API</div>
            <div className="flex gap-5">
              <button type="button" onClick={_getItemList}>
                아이템 조회
              </button>
              <button type="button" onClick={_setFilterOnTicket}>
                필터 아이템 적용
              </button>
              <button type="button" onClick={_addFilter}>
                필터 아이템 추가
              </button>
              <button type="button" onClick={_deleteFilter}>
                필터 아이템 삭제
              </button>
              <button type="button" onClick={_setBackgroundOnTicket}>
                배경색 아이템 적용
              </button>
              <button type="button" onClick={_addBackground}>
                배경색 아이템 추가
              </button>
              <button type="button" onClick={_deleteBackground}>
                배경색 아이템 삭제
              </button>
            </div>
          </div>
          <div className="text-center bg-pink-400 w-full">
            <div className="text-[20px] underline underline-offset-2">경기 관련 API</div>
            <div className="flex gap-5">
              <button type="button" onClick={_setGame}>
                경기 등록
              </button>
              <button type="button" onClick={_setSeatPrice}>
                경기장 구역 가격 설정
              </button>
              <button type="button" onClick={_setZoneName}>
                구역 이름 설정
              </button>
              <button type="button" onClick={_getSeatState}>
                좌석 상태 조회
              </button>
              <button type="button" onClick={execute}>
                쿼리 실행
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BlockchainTest;
