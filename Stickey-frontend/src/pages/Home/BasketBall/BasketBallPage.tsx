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
import { useGame } from "../../../hooks/Home/useGame";
import { IGameSimpleRes } from "../../../types/Home";
import dayjs from 'dayjs';


const BasketBallPage = () => {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState<boolean>(false);
  const today= new Date();
  const [selectedDate, setSelectedDate] = useState<number>(today.getDate());
  const [selectedMonth, setSelectedMonth] = useState<number>(today.getMonth());
  const [selectedYear, setSelectedYear] = useState<number>(today.getFullYear());

  const openBottomSheet = () => {
    setIsBottomSheetOpen(true);
  }

  const closeBottomSheet = () => {
    setIsBottomSheetOpen(false);
  }

  const handleDateClick = (day: number, month: number, year: number) => {
    setSelectedDate(day);
    setSelectedMonth(month -1);
    setSelectedYear(year);
  };

  const { useGetGameList } = useGame();

  const date = dayjs().format('YYYYMM')

  const {
    data : gameListInfo,
  } = useGetGameList({catg: 'BASKETBALL', club: [], date: date});

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


  const filteredMatches = gameListInfo?.data ? gameListInfo.data.gameResList.filter((data: IGameSimpleRes) => {
    const matchDate = new Date(data.gameStartTime);
    return (
      matchDate.getDate() === selectedDate &&
      matchDate.getMonth() === selectedMonth &&
      matchDate.getFullYear() === selectedYear
    );
  }) : [];

  console.log(filteredMatches)

  return(
    <>
      <Header info={info}/>
      <BottomSheet isOpen={isBottomSheetOpen} onClose={closeBottomSheet}/>
      <div className="py-16">
        <TeamList catg="BASKETBALL" />
        <Calendar onDateClick={handleDateClick}/>
        { filteredMatches?.length === 0 ? (
          <div className="flex flex-col items-center mt-40">
            <img src={Hush} className="h-20" />
            <p className=" text-white text-sm mt-4">진행 중인 경기가 없어요!</p>
          </div>
        ) : (
          filteredMatches?.map((item) =>(
            <div className="" key={item.id}>
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