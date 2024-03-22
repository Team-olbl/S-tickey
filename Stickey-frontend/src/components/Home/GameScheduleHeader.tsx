import { preferredClub } from "../../pages/Home/HomePage";

const GameScheduleHeader = ({data} : {data:preferredClub}) => {
  return (
    <>
      <div className="flex flex-row items-center p-4">
        <div className="w-[28px] h-[28px]">{data.team_1}</div>
        <div className="w-[28px] h-[28px]">{data.team_2}</div>
        <p className="text-white text-[15px]">경기정보 한눈에 보기</p>
      </div>
    </>
  )
}

export default GameScheduleHeader;