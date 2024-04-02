import { IUserProfile } from "../../../types/Profile";
import Accept  from '../../../assets/image/Accept.png'
import Wallet from "../../@common/Wallet";

const GroupProfile = ({ groupInfo }: { groupInfo: IUserProfile | null }) => {

  const getAccept = () => {

    if (!groupInfo) {
      return null;
    }
    if (groupInfo?.status === "ACCEPTED") {
      return (
        <>
        <div className="flex items-center">
          <img className="h-6" src={Accept}  />
          <p className="text-sm px-2">인증이 완료된 기관입니다.</p>
          </div>
        </>
      );
    } else if (groupInfo?.status === "REJECTED"){
      return (
        <>
        <div className="flex items-center">
          <p className="text-sm px-2">인증이 거절되었습니다.</p>
          </div>
        </>
      );
    } else if (groupInfo?.status === "WAITING"){
      return (
        <>
          <div className="flex items-center">
            <p className="text-sm px-2">인증이 대기 중입니다.</p>
          </div>
        </>
      )
    }
  };

  return (
    <>    
    {/* 단체 유저 프로필  */}
    <div className="flex justify-center">
        <div className="flex flex-row items-center gap-3 max-w-[500px] w-full h-auto border-none px-6">
          <div className="w-20 h-20 rounded-full bg-Stickey_Gray">
            <img className="w-20 h-20 rounded-full" src={groupInfo?.profileImage} /> 
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-2xl text-white font-semibold">{groupInfo?.name}</p>
            <div className="flex flex-row">

              {/* 로직 추가 */}
              <p className="text-sm text-white">{getAccept()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 지갑 */}
      <div className="flex justify-center pt-4">
        <div className="w-full p-4">
          <Wallet />
        </div>
      </div>
    </>
  );
};

export default GroupProfile;
