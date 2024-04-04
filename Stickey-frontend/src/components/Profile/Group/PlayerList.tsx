import { useProfile } from '../../../hooks/Profile/useProfile';
import Player from '../../../assets/image/Player.png';

const PlayerList = () => {
  const { useGetPlayerList } = useProfile();
  const { data: playerListInfo } = useGetPlayerList();

  return (
    <div>
      <div>
        {playerListInfo && playerListInfo?.data.playerResList.length > 0 ? (
          playerListInfo?.data.playerResList.map((item, id) => (
            <div className="py-2 flex flex-col justify-center items-center" key={id}>
              <div className="py-4 rounded-lg bg-[#2E2E3D]">
                <div className="flex items-center">
                  {/* 선수 사진 */}
                  <img className="w-20 h-20 ml-8 mr-4 rounded-full" src={item.profile} />
                  {/*  선수 정보 */}
                  <div className="flex flex-col px-8 h-auto text-white pl-4">
                    <div className="flex items-center justify-start py-2">
                      <p className="text-xs px-2">{item.category}</p>
                      <p className="text-md px-2">{item.name}</p>
                    </div>
                    <div className="border-b-2"></div>
                    <div className="flex flex-col py-2">
                      <div className="flex items-center">
                        <p className="text-xs px-2 text-[#A0A0A0]">생년월일</p>
                        <p className="text-sm px-2">{item.birth}</p>
                      </div>
                      <div className="flex items-center">
                        <p className="text-xs px-2 text-[#A0A0A0]">선수설명</p>
                        <div className="px-2 text-sm">{item.description}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center pt-40">
            <img className="w-32" src={Player} />
            <div className="text-white text-center text-sm py-4">
              <p className="py-4">아직 등록된 유망주 선수가 없어요 !</p>
              <p>후원 유망주를 등록해주세요.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayerList;
