import { useState } from "react";
import Header, { IHeaderInfo } from "../../../components/@common/Header";
import NavigationBar from "../../../components/@common/NavigationBar";
import BookInfo from "../../../components/Book/BookInfo";
import BookSeat from "../../../components/Book/BookSeat";

export interface IGameInfo {
  id: number;
  stadium: string;
  homeTeam: string;
  awayTeam: string;
  bookStartTime: string;
  bookEndTime: string;
  gameStartTime: string;
}

const dummyGameInfo: IGameInfo = {
  id: 4,
  stadium: "DGB대구은행파크",
  homeTeam: "전북FC",
  awayTeam: "FC서울",
  bookStartTime: "2024-03-15T01:42:48",
  bookEndTime: "2024-03-21T01:42:48",
  gameStartTime: "2024-03-21T01:42:48"
};


const BookSeatPage = () => {

  const [selectedSeat, setSelectedSeat] = useState<string>('');

  console.log(setSelectedSeat)

  const info : IHeaderInfo = {
    left_1:  null,
    left_2: null,
    center:'예매하기',
    right: <img src="/src/assets/image/Bell.png" />
  }


  return(
    <>
      <div>
        <Header info={info} />
        <div className="pt-14">
          <BookInfo gameInfo={dummyGameInfo} />
          <BookSeat selectedSeat={selectedSeat} />
        </div>
        <NavigationBar />
      </div>
    </>
  )
}

export default BookSeatPage;