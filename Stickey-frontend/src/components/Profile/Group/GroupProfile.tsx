import { IUserProfile } from "../../../types/Profile";


const GroupProfile = ({ userInfo }: { userInfo: IUserProfile | null }) => {

  // 인증여부에 따라 인증마크 로직 및 css 추가해야함

  return (
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
  );
};

export default GroupProfile;
