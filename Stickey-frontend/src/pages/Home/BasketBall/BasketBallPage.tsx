import Header, { IHeaderInfo } from "../../../components/@common/Header";
import NavigationBar from "../../../components/@common/NavigationBar";
import Bell from "../../../assets/image/Bell.png"
import Down from "../../../assets/image/Down.png"
import { useState } from "react";
import MatchItem from "../../../components/Soccer/MatchItem";
import Calendar from "../../../components/@common/Calendar";
import TeamList from "../../../components/Soccer/TeamList";
import Hush from '../../../assets/image/MatchItem.png'
import BottomSheet from "../../../components/@common/BottomSheet";

export type MatchItemData = {
  id: number;
  stadium: string;
  homeTeam: string;
  homeTeamLogo: JSX.Element;
  awayTeam: string;
  awayTeamLogo: JSX.Element;
  bookStartTime: string;
  bookEndTime: string;
  gameStartTime: string;
}

const BasketBallPage = () => {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState<boolean>(false);

  const openBottomSheet = () => {
    setIsBottomSheetOpen(true);
  }

  const closeBottomSheet = () => {
    setIsBottomSheetOpen(false);
  }

  const info : IHeaderInfo = {
    left_1: (
      <div className="flex flex-row cursor-pointer" onClick={openBottomSheet}>
        <p>농구</p>
        <img src={Down} className="w-5"/>
      </div>
    ),
    left_2: null,
    center: null,
    right: <img src={Bell} alt="" />
  }

  const dummies:MatchItemData[] = [
    {
      id: 1,
      stadium: "DGB대구은행파크",
      homeTeam: "대구FC",
      homeTeamLogo: <img />,
      awayTeam: "광주FC",
      awayTeamLogo: <img />,
      bookStartTime: "2024-03-15T01:42:48",
      bookEndTime: "2024-03-21T01:42:48",
      gameStartTime: "2024-03-21T01:42:48"
    },
    {
      id: 2,
      stadium: "DGB대구은행파크",
      homeTeam: "대구FC",
      homeTeamLogo: <img />,
      awayTeam: "광주FC",
      awayTeamLogo: <img />,
      bookStartTime: "2024-03-15T01:42:48",
      bookEndTime: "2024-03-21T01:42:48",
      gameStartTime: "2024-03-21T01:42:48"
    },
  ]
  return(
    <>
      <Header info={info}/>
      <BottomSheet isOpen={isBottomSheetOpen} onClose={closeBottomSheet}/>
      <div className="py-16">
        <TeamList />
        <Calendar />
        {dummies.length === 0 ? (
          <div className="flex flex-col items-center mt-40">
            <img src={Hush} className="h-20" />
            <p className=" text-white text-sm mt-4">진행 중인 경기가 없어요!</p>
          </div>
        ) : (
          dummies.map((item) =>(
            <div className="px-4 py-1" key={item.id}>
              <MatchItem data={item} />
            </div>
          ))
        )}
      </div>
      <NavigationBar />
    </>
  )
}

export default BasketBallPage;