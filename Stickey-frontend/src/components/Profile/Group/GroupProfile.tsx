import { IUserProfile } from "../../../types/Profile";
import Accept  from '../../../assets/image/Accept.png'

const GroupProfile = ({ groupInfo }: { groupInfo: IUserProfile | null }) => {

  const getAccept = () => {

    if (!groupInfo) {
      return null; // 렌더링하지 않고 종료
    }

    if (groupInfo?.role === "ACCEPTED") {
      return (
        <>
          인증완료
          <img className="h-12" src={Accept}  />
        </>
      );
    } else {
      return "추가 인증 필요";
    }
  };

  return (
    <>    
    {/* 단체 유저 프로필  */}
    <div className="flex justify-center">
        <div className="flex flex-row gap-3 max-w-[500px] w-full h-[60px] border-none px-6">
          <div className="w-[56px] h-[56px] rounded-full border border-none bg-Stickey_Gray"></div>
          <div className="flex flex-col gap-2">
            <p className="text-[20px] text-white font-semibold">{groupInfo?.name}</p>
            <div className="flex flex-row">

              {/* 로직 추가 */}
              <p className="text-sm text-white">{getAccept()}</p>

            </div>
          </div>
        </div>
      </div>

      {/* 지갑 */}
      <div className="flex justify-center px-5">
        <div className="w-full h-[128px] border-none bg-Stickey_Gray mt-4 rounded-[10px]">
          
        </div>
      </div>
    </>
  );
};

export default GroupProfile;
