import Header, { IHeaderInfo } from "../../../components/@common/Header";
import NavigationBar from "../../../components/@common/NavigationBar";
import BookInfo from "../../../components/Book/BookInfo";
import BookSeat from "../../../components/Book/BookSeat";
import Bell from '../../../assets/image/Bell.png';
import { useTicketInfoStore } from "../../../stores/useTicketInfoStore";


const BookSeatPage = () => {

  const gameInfo = useTicketInfoStore((state) => state.modalData);
  console.log(gameInfo)

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
          <BookInfo />
          <BookSeat />
        </div>
        <NavigationBar />
      </div>
    </>
  )
}

export default BookSeatPage;