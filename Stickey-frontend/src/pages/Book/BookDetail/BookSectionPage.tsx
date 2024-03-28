import Header, { IHeaderInfo } from "../../../components/@common/Header";
import NavigationBar from "../../../components/@common/NavigationBar";
import Back from '../../../assets/image/Back.png'
import Bell from '../../../assets/image/Bell.png'
import BookInfo from "../../../components/Book/BookInfo";
import BookSection from "../../../components/Book/BookSection";
import { useTicketInfoStore } from "../../../stores/useTicketInfoStore";

const BookSectionPage = () => {

  const gameInfo = useTicketInfoStore((state) => state.modalData);

  const info : IHeaderInfo = {
    left_1:  null,
    left_2: <img src={Back} />,
    center:'예매하기',
    right: <img src={Bell} />
  }

  console.log("log", gameInfo)

  return(
    <>
    <div>
      <Header info={info} />
        <div className="pt-14">
          {/* 경기정보 */}
          <BookInfo />
          {/* 구역 정보 */}
          <BookSection />
        </div>
      <NavigationBar />
    </div>
    </>
  )
}

export default BookSectionPage;