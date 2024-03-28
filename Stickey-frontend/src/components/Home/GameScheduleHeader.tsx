import userStore from "../../stores/userStore";

const GameScheduleHeader = () => {
  const { preferences } = userStore();
  console.log(preferences);
  return (
    <>
      <div className="flex flex-row items-center p-4">
        {preferences.map((preference, index) => (
          <img key={index} src={preference.sportsClubLogo} className="w-[28px] h-[28px]" />
        ))}
        <p className="text-white text-[15px]">경기정보 한눈에 보기</p>
      </div>
    </>
  );
};

export default GameScheduleHeader;
