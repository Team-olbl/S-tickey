import Carousel from '../../components/Home/Carousel';
import Category from '../../components/Home/Category';
import Bell from '../../assets/image/Bell.png';
import GameSchedule from '../../components/Home/GameSchedule';
import Header, { IHeaderInfo } from '../../components/@common/Header';
import NavigationBar from '../../components/@common/NavigationBar';
import GameScheduleHeader from '../../components/Home/GameScheduleHeader';
import { useGame } from '../../hooks/Home/useGame';
import userStore from '../../stores/userStore';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/image/Stickey_logo.png';

export type preferredClub = {
  id: number;
  team_1: JSX.Element;
  team_2: JSX.Element;
};

const HomePage = () => {
  const navigate = useNavigate();
  const { useGetGameList } = useGame();
  const { preferences } = userStore();

  const {
    data: gameListInfo,
  } = useGetGameList({ catg : undefined, club: [ ...preferences.map((item) => item.sportsClubName )], date : undefined});


  const info: IHeaderInfo = {
    left_1: <img className="w-20" src={Logo} />,
    left_2: null,
    center: null,
    right: <img src={Bell} alt="" />,
  };

  return (
    <>
      <Header info={info} />
      <div className="py-16">
        <Carousel />
        <Category />
        <GameScheduleHeader />
        {preferences && preferences.length > 0 ? (
          gameListInfo?.data.gameResList.map((item, id) => <GameSchedule data={item} key={id} />)
        ) : (
          <div className="px-4 flex justify-center items-center">
            <button
              className={`bg-Stickey_Main rounded-full text-white p-2 text-sm`}
              onClick={() => navigate('/profile')}
            >
              선호구단 등록하기
            </button>
          </div>
        )}
      </div>
      <NavigationBar />
    </>
  );
};

export default HomePage;
