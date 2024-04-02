import { useState } from "react";
import BottomModal from "../@common/BottomModal";
import Prohibit from '../../assets/image/Prohibited.png'
import { IGameSimpleRes } from "../../types/Home";
import { useTicketInfoStore } from "../../stores/useTicketInfoStore";
import dayjs from "dayjs";
import userStore from "../../stores/userStore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import 'dayjs/locale/ko';
import WaittingModal from "../Book/WaittingModal";


const MatchItem = ({ data }: { data: IGameSimpleRes }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isLogin } = userStore();
  const navigate = useNavigate();
  const [isWaitModalOpen, setIsWaitModalOpen] = useState(false);
  const setModalData = useTicketInfoStore((state) => state.setModalData);
  const bookingStatus = getBookingStatus(data);
  dayjs.locale("ko");

  const handleBookTicket = () => {
    if (!isLogin) {
      toast.error('예매를 하려면 로그인이 필요합니다.')
      navigate('/login')
      return;
    }
    setIsModalOpen(true);
  };

  function getBookingStatus(data: IGameSimpleRes) {
    const currentTime = new Date();
    const bookStartTime = new Date(data.bookStartTime);
    const bookEndTime = new Date(data.bookEndTime);

    if (currentTime < bookStartTime) {
      return "notopen";
    } else if (currentTime >= bookStartTime && currentTime <= bookEndTime) {
      return "ticketing";
    } else {
      return "close";
    }
  }

  const gameDate = dayjs(data.gameStartTime).format('YYYY년 MM월 DD일 HH시 mm분')
  const bookStart = dayjs(data.bookStartTime).format("YYYY.MM.DD (ddd) HH:mm");

  return (
    <>
    <div className="px-4 py-1">
      <div className="w-full max-w-[500px] border-none border-[#2E2E3D] rounded-[15px] bg-[#2E2E3D] shadow-[2px_2px_rgba(0,0,0,0.25)] p-6 text-white">
        <div className="flex flex-row text-center justify-center gap-10">
          <div className="flex flex-col justify-center items-center ">
            <p className="text-[10px] pb-1">Home</p>
            <div className="w-12 h-12 rounded-full bg-Stickey_Gray mb-1">
              <img src={data.homeTeamLogo || ''} />
            </div>
            <p className="text-md">{data.homeTeam}</p>
          </div>
          <div className="flex items-center">
            <p className="text-[20px]">VS</p>
          </div>
          <div className="flex flex-col justify-center items-center">
            <p className="text-[10px] pb-1">Away</p>
            <div className="w-12 h-12 rounded-full bg-Stickey_Gray mb-1">
              <img src={data.awayTeamLogo || ''} />
            </div>
            <p className="text-md pt-2">{data.awayTeam}</p>
          </div>
        </div>
        <div className="flex flex-col text-center pt-[10px] text-sm">
          <p>{data.stadium}</p>
          <p>{gameDate}</p>
        </div>
        <div className="flex flex-col items-center pt-4">
        <button
            className={`w-full h-[36px] border-none rounded-[10px] flex justify-center items-center ${
              bookingStatus === 'notopen' || bookingStatus === 'close' ? 'bg-gray-400' : 
              bookingStatus === 'ticketing' ? 'bg-Stickey_Main cursor-pointer' : ''
            }`}
            onClick={bookingStatus === 'ticketing' ? handleBookTicket : undefined}
            >
              {bookingStatus === 'notopen' &&
            <p className="text-sm text-center">{bookStart} 오픈예정</p>}
            {bookingStatus === 'ticketing' && 
            <p className="text-sm text-center">티켓 예매하기</p>}
              {bookingStatus === 'close' &&
            <p className="text-sm text-center">마감 되었습니다</p>}

          </button>
        </div>
      </div>
      </div>

      {/* 모달 */}
      {isModalOpen && (
        <BottomModal
          height="auto"
          title="경기장 내 안전 수칙"
          onClose={() => setIsModalOpen(false)}
        >
          <div className="px-8 py-2">
            {/* 안전 수칙 내용 */}
            <div className="flex flex-col space-y-2">
              <div className="flex items-center p-2 bg-[#E4F7FE] mb-1">
                <img className="w-8" src={Prohibit} alt="Prohibit Icon" />
                <p className="font-bold text-sm px-2">유리병, 캔 절대 반입 금지</p>
              </div>
              <div className="flex items-center p-2 bg-[#E4F7FE] mb-1">
                <img className="w-8" src={Prohibit} alt="Prohibit Icon" />
                <p className="font-bold text-sm px-2">화학류, 발화 용품 절대 반입 금지</p>
              </div>
              <div className="flex items-center p-2 bg-[#E4F7FE] mb-1">
                <img className="w-8" src={Prohibit} alt="Prohibit Icon" />
                <p className="font-bold text-sm px-2">경기장 내 난입 및 소지품 투척 금지</p>
              </div>
              <div className="flex items-center p-2 bg-[#E4F7FE] mb-1">
                <img className="w-8" src={Prohibit} alt="Prohibit Icon" />
                <p className="font-bold text-sm px-2">좌석 사이 틈 소지품 추락 주의</p>
              </div>
              <div className="flex items-center p-2 bg-[#E4F7FE] mb-1">
                <img className="w-8" src={Prohibit} alt="Prohibit Icon" />
                <p className="font-bold text-sm px-2">정치적, 종교적 문구 / 비방 문구가 포함된 게시물 반입 및 게시 금지</p>
              </div>
            </div>

            <div className="pt-4">
              <button onClick={() => {
                setModalData(data); 
                setIsWaitModalOpen(true);
              }} className="bg-Stickey_Main w-full py-2 rounded-md text-white text-sm">예매하기</button>
            </div>
          </div>
        </BottomModal>
      )}
        {isWaitModalOpen && <WaittingModal onClose={() => setIsWaitModalOpen(false)}/>}
    </>
  );
};

export default MatchItem;
