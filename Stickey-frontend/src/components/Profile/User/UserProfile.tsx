import { IPreTeamSimpleRes, IUserProfile } from "../../../types/Profile";
import Wallet from "../../@common/Wallet";

const UserProfile = ({ userInfo }: { userInfo: IUserProfile | null }) => {
  if (!userInfo) {
    return null;
  }

  return (
    <>
    {/* 개인 유저 프로필 */}
    <div className="flex justify-center">
        <div className="flex flex-row items-center gap-3 max-w-[500px] w-full h-auto border-none px-6">
          <div className="w-20 h-20 rounded-full bg-white">
            <img className="w-20 h-20 rounded-full" src={userInfo.profileImage} />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-2xl text-white font-semibold">{userInfo.name}</p>
            <div className="flex flex-row">
            {userInfo?.preference.map((team: IPreTeamSimpleRes, id: number) => (
              <div key={id} className="p-1 px-2 border border-none bg-[#E4E4E4] text-[#5959E7] text-xs flex items-center justify-center rounded-xl mr-2">
                <p>{team.sportsClubName}</p>
              </div>
            ))}
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

export default UserProfile;
