import { useNavigate } from 'react-router-dom';
import Header, { IHeaderInfo } from '../../../components/@common/Header';
import Back from '../../../assets/image/Back.png';
import Bell from '../../../assets/image/Bell.png';
import NavigationBar from '../../../components/@common/NavigationBar';
import SponItem from '../../../components/Profile/Group/SponItem';

const SponListPage = () => {
  const navigate = useNavigate();

  const gotoCreatePage = () => {
    navigate('/sponsor/create');
  };

  const info: IHeaderInfo = {
    left_1: null,
    left_2: <img src={Back} />,
    center: '후원 글 목록',
    right: <img src={Bell} />,
  };

  return (
    <>
      <Header info={info} />
      <div className="pt-12">
        <SponItem />

        {/* 후원글 등록 버튼 */}
        <div className="fixed bottom-20 w-full max-w-[500px] px-4 flex justify-end">
          <button
            className="flex justify-center items-center text-4xl text-white bg-Stickey_Main w-12 h-12 rounded-full"
            onClick={() => gotoCreatePage()}
          >
            +
          </button>
        </div>
      </div>
      <NavigationBar />
    </>
  );
};

export default SponListPage;
