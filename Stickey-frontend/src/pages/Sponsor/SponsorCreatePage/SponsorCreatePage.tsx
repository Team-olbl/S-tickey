import Header, { IHeaderInfo } from '../../../components/@common/Header';
import NavigationBar from '../../../components/@common/NavigationBar';
import Back from '../../../assets/image/Back.png';
import Bell from '../../../assets/image/Bell.png';
import SponsorForm from '../../../components/Sponsor/SponsorForm';

const SponsorCreatePage = () => {
  const info: IHeaderInfo = {
    left_1: null,
    left_2: <img src={Back} alt="" />,
    center: '후원등록',
    right: <img src={Bell} alt="" />,
  };

  return (
    <>
      <div className="top-0 bottom-0 h-screen bg-white">
        <Header info={info} />
        <SponsorForm />
        <NavigationBar />
      </div>
    </>
  );
};

export default SponsorCreatePage;
