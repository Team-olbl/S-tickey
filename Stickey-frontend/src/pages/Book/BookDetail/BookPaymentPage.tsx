import Header, { IHeaderInfo } from "../../../components/@common/Header";
import Bell from '../../../assets/image/Bell.png';
import NavigationBar from "../../../components/@common/NavigationBar";
import useTicketStore from "../../../stores/useTicketStore";
import { useNavigate } from "react-router-dom";
import { useTicketInfoStore } from "../../../stores/useTicketInfoStore";
import dayjs from "dayjs";
import { useEffect } from "react";
import { connect, createTicket } from "../../../service/web3/api";
import { registSeats } from "../../../service/Book/api";

export interface DummyUserInfo {
  name: string;
  phoneNumber: string;
  email: string;
}
const dummyUser: DummyUserInfo = {
  name: "최더미",
  phoneNumber: "010-1234-5678",
  email: "dummy@example.com",
};

const BookPaymentPage = () => {

  const { seatInfo, clearSeatInfo } = useTicketStore();
  const navigate = useNavigate();

  const info : IHeaderInfo = {
    left_1:  null,
    left_2: null,
    center:'예매하기',
    right: <img src={Bell} />
  }

  const getSeatColor = (seat: string): string => {
    switch (seat) {
        case 'S구역 1':
        case 'S구역 2':
            return '#FEACAC';
        case 'R구역 1':
        case 'R구역 2':
        case 'R구역 3':
        case 'R구역 4':
            return '#D2C2FF';
        case 'W구역 1':
        case 'W구역 2':
            return '#FAF8B7';
        case 'E구역 1':
        case 'E구역 2':
        case 'E구역 3':
        case 'E구역 4':
            return '#C3E7FF';
        default:
            return '#FFFFFF'; // 기본 색상
    }
};

  const goBack = () => {
  if (confirm("결제 작업을 취소하시겠습니까? 그 동안의 작업이 사라집니다")) {
      navigate(-1)   
  }
}

const gameInfo = useTicketInfoStore((state) => state.modalData);

  useEffect(() => {
    connect();
  if(!gameInfo?.id) {
      alert('예매 정보가 초기화 되었습니다. 다시 시도해주세요.')
      navigate('/', {replace: true})
  }
}, [])

const gameDate = dayjs(gameInfo?.gameStartTime).format('YYYY년 MM월 DD일 HH시 mm분')


  const goConformTicket = () => {

    const buyTicket = async () => {
      const tx = await createTicket(seatInfo.seat.length, gameInfo!.id, 1, seatInfo.sectionId, seatInfo.seat, seatInfo.sectionPrice);
      if (tx) {
        const res = await registSeats({ gameId: gameInfo!.id, zoneId: seatInfo.sectionId, seatNumbers: seatInfo.seat, isRefund: false });

        if (res.status == 200) {
          navigate(`/${gameInfo?.id}/confirm`,  {replace:true})
          clearSeatInfo()
          return;
        } 
      } 
      alert("오류가 발생했습니다. 홈으로 되돌아갑니다.");
      navigate('/', { replace: true });
    }

    buyTicket();
  }

const totalPrice = () => {
  const pricePerSeat = seatInfo.sectionPrice; 
  return seatInfo.seat.length * pricePerSeat;
};

  return(
    <>
    <Header info={info} />
      <div className="px-8">
        
        <div className="flex flex-col items-center">
          {/* 스텝바 */}
          <div className="pt-16 pb-4 w-[150px]">
              <div className="relative after:absolute after:inset-x-0 after:top-1/2 after:block after:h-0.5 after:-translate-y-1/2 after:rounded-lg after:bg-gray-100">
                  <ol className="relative z-10 flex justify-between">
                  <li className="flex items-center">
                  <span className="size-5 rounded-full bg-Stickey_Main border-2 border-Stickey_Main text-center text-xs"> 1 </span>

                  </li>

                  <li className="flex items-center p-2">
                      <span className="size-5 rounded-full bg-Stickey_Main border-2 border-Stickey_Main text-center text-xs"> 2 </span>
                  </li>

                  <li className="flex items-center">
                      <span className="size-5 rounded-full bg-Stickey_Main border-2 border-Stickey_Main text-center text-xs"> 3 </span>
                  </li>
                  </ol>
              </div>
              </div>

              <div className="pb-2 text-white text-sm">
                  <p>회원정보 확인</p>
              </div>

              {/* 회원정보 */}
              <div className="bg-[#2E2E3D] w-full h-auto p-6 text-white text-sm rounded-lg">
                <div>이름 : {dummyUser.name}</div>
                <div className="py-2">전화번호 : {dummyUser.phoneNumber}</div>
                <div>이메일 : {dummyUser.email}</div>
              </div>

              <div className="py-3 text-white text-sm">
                  <p>예매정보 확인</p>
              </div>

              {/* 예매정보 */}
              <div className="bg-[#2E2E3D] w-full h-auto p-6 text-white text-sm rounded-lg">
                <div className="py-2">예매경기 : {gameInfo?.homeTeam} vs {gameInfo?.awayTeam}</div>
                <div className="py-2">경기장소 : {gameInfo?.stadium}</div>
                <div className="py-2">경기일정 : {gameDate}</div>

                <div className="py-2 flex items-center">
                <div>좌석등급 :</div>
                <div className={`h-2 w-6 ml-2 rounded-md`} style={{ backgroundColor: getSeatColor(seatInfo.section) }} />
                <div className="text-white ml-2 text-sm">{seatInfo.section}</div>
                </div>
                
                <div className="py-2 flex flex-wrap items-center">
                <div className="mr-2">좌석정보 :</div>
                    {seatInfo.seat.map((seat, index) => (
                        <div key={index} className="bg-purple-500 text-center w-6 mx-1 text-black font-bold text-xs rounded-md">{seat}</div>
                    ))}
                </div>

                <div className="py-2">결제가격 : {totalPrice()} 원</div>

                <div className="text-center text-[10px] pt-6">
                  <p>티켓 취소는  경기 시작 1시간 전까지 가능합니다.</p>
                  <p>취소수수료 : 경기 시작 3일 전부터 티켓금액의 30%</p>
                </div>

              </div>

              {/* 결제버튼 */}
              <div className="w-full max-w-[500px] px-4 pt-6 pb-24 flex justify-center">
                  <button className="bg-Stickey_Gray w-1/2 mr-2 p-3 text-xs rounded-md" onClick={() => goBack()}>취소</button>
                  <button className="bg-Stickey_Main w-1/2 p-3 text-xs rounded-md" onClick={() => goConformTicket()}>결제하기</button>
              </div>
        </div>

      </div>
      <NavigationBar />
    </>
  )
}

export default BookPaymentPage;