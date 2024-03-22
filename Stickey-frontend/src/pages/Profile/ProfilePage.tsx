import Header, {IHeaderInfo} from "../../components/@common/Header";
import NavigationBar from "../../components/@common/NavigationBar";
import Menu from "../../components/Profile/Menu";
import Notice from "../../components/Profile/Notice";
import Profile from "../../components/Profile/ProfileItem";
import Wallet from "../../components/Profile/Wallet";
import Bell from '../../assets/image/Bell.png'

export type preferredTeam = {
  name: string;
}

const ProfilePage = () => {
  const info : IHeaderInfo = {
    left_1: null,
    left_2: null,
    center: '프로필',
    right: <img src={Bell} />
  }
  
  const dummies:preferredTeam[] = [
    {
      name: '대구FC'
    },
    {
      name: 'FC서울'
    },
  ]

  const teamNames = dummies.map((team) => team.name)

  return(
    <>
      <Header info={info} />
      <div className="pt-16">
        <Profile teamNames={teamNames} />
        <Wallet />
        <Notice />
        <Menu />
      </div>
      <NavigationBar />
    </>
  )
}

export default ProfilePage;