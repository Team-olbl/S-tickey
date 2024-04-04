import Header, { IHeaderInfo } from '../../../components/@common/Header';
import NavigationBar from '../../../components/@common/NavigationBar';
import Back from '../../../assets/image/Back.png';
import Bell from '../../../assets/image/Bell.png';
import OrganizationForm from '../../../components/Profile/Group/OrganizationEditForm';

const GroupProfileEditPage = () => {
  const info: IHeaderInfo = {
    left_1: null,
    left_2: <img src={Back} />,
    center: '단체 정보 수정',
    right: <img src={Bell} />,
  };

  return (
    <>
      <Header info={info} />
      <div className="bg-white h-screen">
        <OrganizationForm />
      </div>
      <NavigationBar />
    </>
  );
};

export default GroupProfileEditPage;
