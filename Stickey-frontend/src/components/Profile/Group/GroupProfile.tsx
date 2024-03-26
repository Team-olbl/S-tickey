import { IUserProfile } from "../../../types/Profile";


const GroupProfile = ({ userInfo }: { userInfo: IUserProfile | null }) => {

  // 인증여부에 따라 인증마크 로직 및 css 추가해야함

  return (
    <>    
    {/* 단체 유저 프로필  */}
    <div className="flex justify-center">
        <div className="flex flex-row gap-3 max-w-[500px] w-full h-[60px] border-none px-6">
          <div className="w-[56px] h-[56px] rounded-full border border-none bg-Stickey_Gray"></div>
          <div className="flex flex-col gap-2">
            <p className="text-[20px] text-white font-semibold">{userInfo?.name}</p>
            <div className="flex flex-row">
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
