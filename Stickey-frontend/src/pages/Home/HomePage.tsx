import Carousel from "../../components/Home/Carousel";
import Category from "../../components/Home/Category";
import GameSchedule from "../../components/Home/GameSchedule";
import Header, { IHeaderInfo } from "../../components/@common/Header";
import NavigationBar from "../../components/@common/NavigationBar";

const HomePage = () => {
  const info : IHeaderInfo = {
    left_1: null,
    left_2: null,
    center: null,
    right: <img src="src/assets/Alarm/Bell.png" alt="" />
  }

  return(
    <>
      <Header info={info}/>
      <Carousel />
      <Category />
      <GameSchedule />
      <NavigationBar />
    </>
  )
}

export default HomePage;