import { IPreTeamSimpleRes, IUserProfile } from "../../../types/Profile";

const UserProfile = ({ userInfo }: { userInfo: IUserProfile | null }) => {

  if (!userInfo) {
    return null; // 렌더링하지 않고 종료
  }

  return (
    <>    
    {/* 개인 유저 프로필 */}
    <div className="flex justify-center">
        <div className="flex flex-row gap-3 max-w-[500px] w-full h-[60px] border-none px-6">
          <div className="w-[56px] h-[56px] rounded-full bg-Stickey_Gray">
            <img className="w-[56px] h-[56px] rounded-full" src={userInfo.profileImage} /> 
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-[20px] text-white font-semibold">{userInfo?.name}</p>
            <div className="flex flex-row">
            {userInfo?.preference.map((team: IPreTeamSimpleRes, id: number) => (
              <div key={id} className="p-1 px-2 border border-none font-bold bg-[#E4E4E4] text-[#5959E7] text-[8px] flex items-center justify-center rounded-xl mr-2">
                <p className="">{team.sportsClubName}</p>
              </div>
            ))}
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

export default UserProfile;
