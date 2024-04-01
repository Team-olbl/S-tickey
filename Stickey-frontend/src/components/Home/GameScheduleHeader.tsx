import userStore from "../../stores/userStore";
import Prefer from '../../assets/image/Monocle.png'

const GameScheduleHeader = () => {
  const { preferences } = userStore();
  console.log(preferences);
  return (
    <>
      <div className="flex items-center px-4">
        {preferences &&
          preferences.length > 0 ?
          <div className="flex items-center py-4">
          {preferences.map((preference, index) => (
          <img key={index} src={preference.sportsClubLogo} className="w-6 h-6 mx-1" />
          ))} <p className="text-white text-sm">경기 정보 한눈에 보기</p>
          </div>
          :
          <div className="flex flex-col items-center mx-auto py-4">
            <img className="w-16" src={Prefer} />
            <p className="text-white text-sm py-2">아직 선호하는 구단이 없어요 !</p>
            <p className="text-white text-xs">선호하는 구단을 등록하고 경기 정보를 한눈에 받아보세요</p>
          </div>
        }

      </div>
    </>
  );
};

export default GameScheduleHeader;
