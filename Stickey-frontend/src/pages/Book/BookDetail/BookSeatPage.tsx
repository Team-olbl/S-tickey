import Header, { IHeaderInfo } from "../../../components/@common/Header";
import NavigationBar from "../../../components/@common/NavigationBar";
import BookInfo from "../../../components/Book/BookInfo";
import BookSeat from "../../../components/Book/BookSeat";
import Bell from '../../../assets/image/Bell.png';

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

  const info : IHeaderInfo = {
    left_1:  null,
    left_2: null,
    center:'예매하기',
    right: <img src={Bell} />
  }


  return(
    <>
      <div>
        <Header info={info} />
        <div className="pt-14">
          <BookInfo gameInfo={dummyGameInfo} />
          <BookSeat />
        </div>
        <NavigationBar />
      </div>
    </>
  )
}

export default BookSeatPage;