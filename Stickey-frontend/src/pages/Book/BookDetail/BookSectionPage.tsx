import Header, { IHeaderInfo } from "../../../components/@common/Header";
import NavigationBar from "../../../components/@common/NavigationBar";
import Back from '../../../assets/image/Back.png'
import BookInfo from "../../../components/Book/BookInfo";
import BookSection from "../../../components/Book/BookSection";

export interface IGameInfo {
  id: number;
  stadium: string;
  homeTeam: string;
  awayTeam: string;
  bookStartTime: string;
  bookEndTime: string;
  gameStartTime: string;
}

const BookSectionPage: React.FC<{ gameInfo: IGameInfo }> = () => {

  const dummyGameInfo: IGameInfo = {
    id: 4,
    stadium: "DGB대구은행파크",
    homeTeam: "전북FC",
    awayTeam: "FC서울",
    bookStartTime: "2024-03-15T01:42:48",
    bookEndTime: "2024-03-21T01:42:48",
    gameStartTime: "2024-03-21T01:42:48"
  };

  const info : IHeaderInfo = {
    left_1:  null,
    left_2: <img src={Back} />,
    center:'예매하기',
    right: <img src="/src/assets/image/Bell.png" />
  }


  return(
    <>
    <div>
      <Header info={info} />

        <div className="pt-14 pb-16">
          {/* 경기정보 */}
          <BookInfo gameInfo={dummyGameInfo} />

          {/* 경기장 구역 정보 */}
          <BookSection />

          {/* 사용자 예매 정보 */}
          
        </div>

      <NavigationBar />
    </div>
    </>
  )
}

export default BookSectionPage;