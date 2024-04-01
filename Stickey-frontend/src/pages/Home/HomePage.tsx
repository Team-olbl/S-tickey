import Carousel from "../../components/Home/Carousel";
import Category from "../../components/Home/Category";
import Bell from '../../assets/image/Bell.png'
import GameSchedule from "../../components/Home/GameSchedule";
import Header, { IHeaderInfo } from "../../components/@common/Header";
import NavigationBar from "../../components/@common/NavigationBar";
import GameScheduleHeader from "../../components/Home/GameScheduleHeader";
import { useGame } from "../../hooks/Home/useGame";
import userStore from "../../stores/userStore";
import { useNavigate } from "react-router-dom";

// export type GameItem = {
//   id: number;
//   date: string;
//   dayOfWeek: string;
//   time: string;
//   homeTeam: string;
//   homeTeamLogo: JSX.Element;
//   awayTeam: string;
//   awayTeamLogo: JSX.Element;
// }

export type preferredClub = {
  id: number;
  team_1: JSX.Element;
  team_2: JSX.Element;
}

const HomePage = () => {
  const navigate = useNavigate();
  const { useGetGameList } = useGame();
  const { preferences } = userStore();

  const {
    data: gameListInfo,
    isSuccess
  } = useGetGameList({ catg : undefined, club: [ ...preferences.map((item) => item.sportsClubName )], date : undefined});

  if (isSuccess)
    console.log(gameListInfo);

  const info : IHeaderInfo = {
    left_1: null,
    left_2: null,
    center: null,
    right: <img src={Bell} alt="" />
  }


  return(
    <>
      <Header info={info} />
      <div className="pt-16 pb-16">
        <Carousel />
        <Category />
        <GameScheduleHeader/>
        {preferences && preferences.length > 0 ? gameListInfo?.data.gameResList.map((item, id) => (
          <GameSchedule data={item} key={id}/>
        ))
          :
          <div className="w-[50vw] max-w-[500px] m-auto px-4 flex justify-center items-center">
            <button className={`bg-[#5959E7] w-full text-white rounded-xl p-2 text-md`} onClick={() => navigate('/profile')}>
              선호구단 등록하러가기
            </button>
          </div>
          }
        </div>
      <NavigationBar />
    </>
  )
}

export default HomePage;