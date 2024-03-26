import Header, {IHeaderInfo} from "../../components/@common/Header";
import NavigationBar from "../../components/@common/NavigationBar";
import Bell from '../../assets/image/Bell.png'
import { useProfile } from "../../hooks/Profile/useProfile";
import { IUserProfile } from "../../types/Profile";
import UserProfile from "../../components/Profile/User/UserProfile";
import GroupProfile from "../../components/Profile/Group/GroupProfile";
import UserMenu from "../../components/Profile/User/UserMenu";
import YellowBell from '../../assets/image/YellowBell.png'
import GroupMenu from "../../components/Profile/Group/GroupMenu";

const ProfilePage = () => {

  const { useGetProfile } = useProfile();

  const id: number = 1;
  const role: number = 0;

  console.log(role)

  const { data: userProfileInfo } = useGetProfile(id);

  console.log(userProfileInfo?.data, '프로필 조회')

  const dummyUserProfile: IUserProfile = {
    profileImage: 'image',
    name: '더미 유저',
    preference: [
      {
        sportsClubId: 1,
        sportsClubLogo: 'logo',
        sportsClubName: '대구 FC'
      }
    ]
  };

  const userInfo: IUserProfile | null =  dummyUserProfile;


  const info : IHeaderInfo = {
    left_1: null,
    left_2: null,
    center: '프로필',
    right: <img src={Bell} />
  }
  
  // role에 따라 조건부 랜더링으로 컴포넌트를 구분
  return(
    <>
      <Header info={info} />
      <div className="pt-16">
        {role === 1 ? (
          <>
            <UserProfile userInfo={userInfo} />

            {/* 안내 문구 섹션 */}
            <div className="flex justify-center pt-5 px-5">
              <div className="w-full h-[32px] border-none bg-Stickey_Gray rounded flex flex-row items-center gap-1">
                <img src={YellowBell} className="w-5 h-5 ml-2"/>
                <p className="text-red-600 font-bold text-[12px]">[ TIP ]</p>
                <p className="text-[12px]">IOS 서비스 미지원 기종이 있습니다.</p>
              </div>
            </div>

            <UserMenu />
     
          </>
        ) : (
          <>
            <GroupProfile userInfo={userInfo} />

            {/* 안내 문구 섹션 */}
            <div className="flex justify-center pt-5 px-5">
              <div className="w-full h-[32px] border-none bg-Stickey_Gray rounded flex flex-row items-center gap-1">
                <img src={YellowBell} className="w-5 h-5 ml-2"/>
                <p className="text-red-600 font-bold text-[12px]">[ TIP ]</p>
                <p className="text-[12px]">IOS 서비스 미지원 기종이 있습니다.</p>
              </div>
            </div>

            <GroupMenu />
       
          </>
        )}
      </div>
      <NavigationBar />
    </>
  )
}

export default ProfilePage;