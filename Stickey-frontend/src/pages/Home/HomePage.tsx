import Carousel from "../../components/Home/Carousel";
import Category from "../../components/Home/Category";
import Bell from '../../assets/image/Bell.png'
import GameSchedule from "../../components/Home/GameSchedule";
import Header, { IHeaderInfo } from "../../components/@common/Header";
import NavigationBar from "../../components/@common/NavigationBar";
import 대구 from '../../assets/Logos/대구FC.png'
import 서울 from '../../assets/Logos/서울FC.png'
import GameScheduleHeader from "../../components/Home/GameScheduleHeader";

export type GameItem = {
  id: number;
  date: string;
  dayOfWeek: string;
  time: string;
  homeTeam: string;
  homeTeamLogo: JSX.Element;
  awayTeam: string;
  awayTeamLogo: JSX.Element;
}

export type preferredClub = {
  id: number;
  team_1: JSX.Element;
  team_2: JSX.Element;
}

const HomePage = () => {
  const info : IHeaderInfo = {
    left_1: null,
    left_2: null,
    center: null,
    right: <img src={Bell} alt="" />
  }

  const dummies:GameItem[] = [
    {
      id: 1,
      date: '03.17',
      dayOfWeek: '일',
      time: '20:30',
      homeTeam: '대구FC',
      homeTeamLogo: <img src={대구}  />,
      awayTeam: 'FC서울',
      awayTeamLogo: <img src={서울} />,
    },
    {
      id: 2,
      date: '03.17',
      dayOfWeek: '일',
      time: '20:30',
      homeTeam: '대구FC',
      homeTeamLogo: <img src={대구}  />,
      awayTeam: 'FC서울',
      awayTeamLogo: <img src={서울} />,
    },
    {
      id: 3,
      date: '03.17',
      dayOfWeek: '일',
      time: '20:30',
      homeTeam: '대구FC',
      homeTeamLogo: <img src={대구}  />,
      awayTeam: 'FC서울',
      awayTeamLogo: <img src={서울} />,
    },

  ]

  const dummydata:preferredClub[] = [
    {
      id: 1,
      team_1: <img src={대구} alt="" />,
      team_2: <img src={서울} alt="" />,
    }
  ]

  return(
    <>
      <Header info={info}/>
      <div className="pt-16 pb-16">
        <Carousel />
        <Category />
        {dummydata.map((item, id) => (
          <GameScheduleHeader data={item} key={id}/>
        ))}
        {dummies.map((item, id) => (
          <GameSchedule data={item} key={id}/>
        ))
        }
      </div>
      <NavigationBar />
    </>
  )
}

export default HomePage;