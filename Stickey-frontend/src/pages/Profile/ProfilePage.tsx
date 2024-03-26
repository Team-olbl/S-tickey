import Header, {IHeaderInfo} from "../../components/@common/Header";
import NavigationBar from "../../components/@common/NavigationBar";
import Menu from "../../components/Profile/Menu";
import Notice from "../../components/Profile/Notice";
import ProfileItem from "../../components/Profile/ProfileItem";
import Wallet from "../../components/Profile/Wallet";
import Bell from '../../assets/image/Bell.png'
import { useProfile } from "../../hooks/Profile/useProfile";
import { IUserProfile } from "../../types/Profile";

const ProfilePage = () => {

  const { useGetProfile } = useProfile();

  const id: number = 1;
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
  
  return(
    <>
      <Header info={info} />
      <div className="pt-16">
        <ProfileItem userInfo={userInfo} />
        <Wallet />
        <Notice />
        <Menu />
      </div>
      <NavigationBar />
    </>
  )
}

export default ProfilePage;