import Header, { IHeaderInfo } from "../../../components/@common/Header";
import NavigationBar from "../../../components/@common/NavigationBar";
import BookInfo from "../../../components/Book/BookInfo";
import BookSeat from "../../../components/Book/BookSeat";
import Bell from '../../../assets/image/Bell.png';
import { useTicketInfoStore } from "../../../stores/useTicketInfoStore";
import { useNavigate } from "react-router-dom";
import useTicketStore from "../../../stores/useTicketStore";
import { useEffect } from "react";
import { toast } from "react-toastify";


const BookSeatPage = () => {

  const gameInfo = useTicketInfoStore((state) => state.modalData);
  const { clearSeatInfo } = useTicketStore();
  const navigate = useNavigate(); 
  
  useEffect(() => {
    if(!gameInfo?.id) { 
      toast.warn('예매 정보가 초기화 되었습니다. 다시 시도해주세요.')
      navigate('/', {replace: true})
      clearSeatInfo()
    }
  },[])

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