import { IUserProfile } from "../../../types/Profile";
import Accept  from '../../../assets/image/Accept.png'

const GroupProfile = ({ groupInfo }: { groupInfo: IUserProfile | null }) => {

  const getAccept = () => {

    if (!groupInfo) {
      return null; // 렌더링하지 않고 종료
    }
    console.log(groupInfo)
    if (groupInfo?.status === "ACCEPTED") {
      return (
        <>
        <div className="flex items-center">
          <img className="h-6" src={Accept}  />
          <p className="text-sm px-2">인증이 완료된 기관입니다.</p>
          </div>
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
        <div className="flex flex-row gap-3 max-w-[500px] w-full h-auto border-none px-6">
          <div className="w-16 h-16 rounded-full bg-Stickey_Gray">
            <img src={groupInfo?.profileImage} /> 
          </div>
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
