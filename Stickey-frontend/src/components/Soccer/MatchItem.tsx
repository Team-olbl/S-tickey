import { useState } from "react";
import { MatchItemData } from "../../pages/Home/Soccer/SoccerPage";
import BottomModal from "../@common/BottomModal";
import Prohibit from '../../assets/image/Prohibited.png'
import { useNavigate } from "react-router-dom";


const MatchItem = ({ data }: { data: MatchItemData }) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleBookTicket = () => {
    setIsModalOpen(true);
  };

  const id: number = 1;

  const handleGoToSection = () => {
    navigate(`/${id}/section`);
  };


  return (
    <>
    <div className="w-[332px] h-[212px] border-none border-[#2E2E3D] rounded-[15px] bg-[#2E2E3D] shadow-[2px_2px_rgba(0,0,0,0.25)] p-4 text-white">
      <div className="flex flex-row text-center justify-center gap-10">
        <div className="flex flex-col justify-center items-center">
          <p className="text-[8px] pb-[2px]">홈 팀</p>
          <div className="w-12 h-12 rounded-full border bg-Stickey_Gray relative mb-1">
            {data.homeTeamLogo}
          </div>
          <p className="text-[16px]">{data.homeTeam}</p>
        </div>
        <div className="flex items-center">
          <p className="text-[20px]">VS</p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <p className="text-[8px] pb-[2px]">원정 팀</p>
          <div className="w-12 h-12 rounded-full border bg-Stickey_Gray relative mb-1">
            {data.awayTeamLogo}
          </div>
          <p className="text-[16px]">{data.awayTeam}</p>
        </div>
      </div>
      <div className="flex flex-col text-center pt-[10px] text-[10px]">
        <p>{data.stadium}</p>
        <p>{new Date(data.gameStartTime).toLocaleString()}</p>
      </div>
      <div className="flex flex-col items-center pt-4">
        <button className="w-[280px] h-[36px] border-none bg-[#5959E7] rounded-[10px] flex justify-center items-center" onClick={handleBookTicket}>
          <p className="text-[13px] text-center">티켓 예매하기</p>
        </button>
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
            <div className="flex items-center p-2 bg-[#E4F7FE] mb-1">
              <img className="w-8" src={Prohibit} />
              <p className="font-bold text-sm px-2">유리병, 캔 절대 반입 금지</p>
            </div>
            <div className="flex items-center p-2 bg-[#E4F7FE] mb-1">
              <img className="w-8" src={Prohibit} />
              <p className="font-bold text-sm px-2">화학류, 발화 용품 절대 반입 금지</p>
            </div>
            <div className="flex items-center p-2 bg-[#E4F7FE] mb-1">
              <img className="w-8" src={Prohibit} />
              <p className="font-bold text-sm px-2">경기장 내 난입 및 소지품 투척 금지</p>
            </div>
            <div className="flex items-center p-2 bg-[#E4F7FE] mb-1">
              <img className="w-8" src={Prohibit} />
              <p className="font-bold text-sm px-2">좌석 사이 틈 소지품 추락 주의</p>
            </div>
            <div className="flex items-center p-2 bg-[#E4F7FE] mb-1">
              <img className="w-8" src={Prohibit} />
              <p className="font-bold text-sm px-2">정치적, 종교적 문구 / 비방 문구가 포함된 게시물 반입 및 게시 금지</p>
            </div>

            <div className="pt-4">
              <button onClick={handleGoToSection} className="bg-Stickey_Main w-full py-2 rounded-md text-white text-sm">예매하기</button>
            </div>
           
          </div>
        </BottomModal>
      )}

    </>
  );
};

export default MatchItem;