import { GameItem } from '../../pages/Home/HomePage'

const GameSchedule = ({data}: {data:GameItem}) => {
  return (
    <div className="w-full pb-3 px-4">
      <div className="flex flex-col items-center justify-center gap-[8px]">
        <div className="w-full max-w-[500px] px-4 h-[52px] flex flex-row items-center justify-center bg-[#2E2E3D] rounded-[10px] drop-shadow-[2px_2px_rgba(0,0,0,0.25)]">
          <div className="flex flex-row items-center gap-2">
            <div className="flex flex-row gap-1">
              <p className="text-white text-[12px]">{data.date}</p>
              <p className="text-[#FF0000] text-[12px]">{data.dayOfWeek}</p>
            </div>
            <p className="text-[16px] text-white font-bold">{data.time}</p>
            <div className="flex flex-row items-center gap-2">
              <div className="flex flex-row items-center gap-2">
                <div className="w-[40px] h-[40px]">{data.homeTeamLogo}</div>
                <p className="text-[13px] text-white">{data.homeTeam}</p>
              </div>
              <p className="text-[20px] text-[#FF0000] font-bold">VS</p>
              <div className="flex flex-row items-center gap-2">
                <div className="w-[40px] h-[40px]" >{data.awayTeamLogo}</div>
                <p className="text-[13px] text-white">{data.awayTeam}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GameSchedule;
