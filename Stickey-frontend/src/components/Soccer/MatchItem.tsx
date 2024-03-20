import { MatchItemData } from "../../pages/Home/Soccer/SoccerPage";

const MatchItem = ({ data }: { data: MatchItemData }) => {
  return (
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
        <button className="w-[280px] h-[36px] border-none bg-[#5959E7] rounded-[10px] flex justify-center items-center">
          <p className="text-[13px] text-center">티켓 예매하기</p>
        </button>
      </div>
    </div>
  );
};

export default MatchItem;
