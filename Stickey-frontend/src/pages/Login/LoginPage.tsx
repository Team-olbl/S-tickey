import Header, { IHeaderInfo } from '../../components/@common/Header';
import Back from '../../assets/image/Back.png';
import NavigationBar from '../../components/@common/NavigationBar';
import Bell from '../../assets/image/Bell.png';
import LoginForm from '../../components/Login/LoginForm';

const LoginPage = () => {
  const info: IHeaderInfo = {
    left_1: null,
    left_2: <img src={Back} alt="" />,
    center: '로그인',
    right: <img src={Bell} alt="" />,
  };

  return (
    <>
      <div className="top-0 bottom-0 h-screen bg-white">
        <Header info={info} />
        <div className="py-16">
          <LoginForm />
        </div>
        <NavigationBar />
      </div>
    </>
  );
};

export default LoginPage;
