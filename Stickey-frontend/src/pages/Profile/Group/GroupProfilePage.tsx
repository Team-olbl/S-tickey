import Header, { IHeaderInfo } from "../../../components/@common/Header";
import NavigationBar from "../../../components/@common/NavigationBar";
import GroupProfileItem from "../../../components/Profile/Group/GroupProfileItem";
import Bell from '../../../assets/image/Bell.png'
import Wallet from "../../../components/Profile/Wallet";
import GroupMenu from "../../../components/Profile/Group/GroupMenu";
import Notice from "../../../components/Profile/Notice";


const GroupProfilePage = () => {
  const info : IHeaderInfo = {
    left_1: null,
    left_2: null,
    center: '프로필',
    right: <img src={Bell} />
  }

  return (
    <>
      <Header info={info} />
      <div className="pt-16">
        <GroupProfileItem />
        <Wallet />
        <Notice />
        <GroupMenu />
      </div>
      <NavigationBar />
    </>
  )
}

export default GroupProfilePage;