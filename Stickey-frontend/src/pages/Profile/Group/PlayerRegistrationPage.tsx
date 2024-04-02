import Header, { IHeaderInfo } from '../../../components/@common/Header';
import Back from '../../../assets/image/Back.png';
import Bell from '../../../assets/image/Bell.png';
import NavigationBar from '../../../components/@common/NavigationBar';
import PlayerRegistrationForm from '../../../components/Profile/Group/PlayerRegistrationForm';

const PlayerRegistration = () => {
  const info: IHeaderInfo = {
    left_1: null,
    left_2: <img src={Back} />,
    center: '선수 등록',
    right: <img src={Bell} />,
  };
  return (
    <>
      <Header info={info} />
      <div className="top-0 bottom-0 h-screen bg-white">
        <PlayerRegistrationForm />
      </div>
      <NavigationBar />
    </>
  );
};

export default PlayerRegistration;
