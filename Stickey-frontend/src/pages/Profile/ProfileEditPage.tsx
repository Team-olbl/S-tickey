import NavigationBar from "../../components/@common/NavigationBar";
import Back from '../../assets/image/Back.png'
import Bell from '../../assets/image/Bell.png'
import Header, { IHeaderInfo } from "../../components/@common/Header";

const info : IHeaderInfo = {
  left_1:  null,
  left_2: <img src={Back} />,
  center:'회원정보수정',
  right: <img src={Bell} />
}

const ProfileEditPage = () => {
  return(
    <>
      <Header info={info} />
      <div>

      </div>
      <NavigationBar />
    </>
  )
}

export default ProfileEditPage;