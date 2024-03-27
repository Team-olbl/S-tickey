import { useProfile } from "../../../hooks/Profile/useProfile";
import Player from '../../../assets/image/Player.png'

const PlayerList = () => {
  
  const { useGetPlayerList } = useProfile();
  const { data: playerListInfo } = useGetPlayerList();

  console.log(playerListInfo)

  return (
    <div>
    <div className="w-full flex flex-col justify-center gap-3 items-center px-4">
      {playerListInfo && playerListInfo?.data.playerResList.length > 0 ? (
        playerListInfo?.data.playerResList.map((item, id) => (
          <div key={id} className="px-4">
            <div className="flex items-center h-auto py-4 border-none rounded-[10px] bg-[#2E2E3D]">
              <div className="w-full flex flex-row px-4 gap-3">
                <div className="w-20 h-20 border border-none rounded-full bg-Stickey_Gray">프로필 사진</div>
                <div className="flex flex-col w-[208px] h-[20px] gap-2 text-white">
                  <div className="flex flex-row gap-1">
                    <div className="flex flex-col justify-end">
                      <p className="text-[8px]">{item.category}</p>
                    </div>
                    <p className="text-[12px]">{item.name}</p>
                  </div>
                  <div className="border-b-[0.5px] w-full"></div>
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-row">
                      <p className="w-12 h-[10px] text-[8px] text-[#A0A0A0]">생년월일</p>
                      <p className="w-12 h-[10px] text-[8px]">{item.birth}</p>
                    </div>
                    <div className="flex flex-row">
                      <p className="w-12 h-10 text-[8px] text-[#A0A0A0]">선수 설명</p>
                      <div className="flex flex-col gap-1">{item.description}</div>
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
