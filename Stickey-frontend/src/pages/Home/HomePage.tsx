import Carousel from "../../components/Home/Carousel";
import Category from "../../components/Home/Category";
import GameSchedule from "../../components/Home/GameSchedule";
import Header, { IHeaderInfo } from "../../components/Header";
import NavigationBar from "../../components/NavigationBar";

const HomePage = () => {
  const info : IHeaderInfo = {
    left: null,
    center:'S:tickey',
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