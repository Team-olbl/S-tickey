import Carousel from "../../components/Home/Carousel";
import Category from "../../components/Home/Category";
import GameSchedule from "../../components/Home/GameSchedule";
import HomeHeader from "../../components/Home/HomeHeader";
import NavigationBar from "../../components/NavigationBar";

const HomePage = () => {
  return( 
    <>
      <HomeHeader />
      <Carousel />
      <Category />
      <GameSchedule />
      <NavigationBar />
    </>
  )
}

export default HomePage;