import userStore from "../../stores/userStore";

const GameScheduleHeader = () => {
  const { preferences } = userStore();
  console.log(preferences);
  return (
    <>
      <div className="flex flex-row items-center p-4">
        {preferences &&
          
          preferences.length > 0 ?
          
          <>
          {preferences.map((preference, index) => (
          <img key={index} src={preference.sportsClubLogo} className="w-[28px] h-[28px] mx-2" />
          ))} <p className="text-white text-[15px]">경기 정보 한눈에 보기</p>
          </>
          :
          <p className="text-white text-[15px]">선호 구단을 등록해주세요!</p>
        }

      </div>
    </>
  );
};

export default GameScheduleHeader;
