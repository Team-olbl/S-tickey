import Header, {IHeaderInfo} from "../../components/@common/Header";
import NavigationBar from "../../components/@common/NavigationBar";
import Notice from "../../components/Profile/Notice";
import Wallet from "../../components/Profile/Wallet";
import Bell from '../../assets/image/Bell.png'
import { useProfile } from "../../hooks/Profile/useProfile";
import { IUserProfile } from "../../types/Profile";
import UserProfile from "../../components/Profile/User/UserProfile";
import GroupProfile from "../../components/Profile/Group/GroupProfile";
import UserMenu from "../../components/Profile/User/UserMenu";

const ProfilePage = () => {

  const { useGetProfile } = useProfile();

  const id: number = 1;
  const role: number = 1;

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
            <Wallet />
            <Notice />
            <UserMenu />
     
          </>
        ) : (
          <>
            <GroupProfile userInfo={userInfo} />
            <Wallet />
            <Notice />
       
          </>
        )}
      </div>
      <NavigationBar />
    </>
  )
}

export default ProfilePage;