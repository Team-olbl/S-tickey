import Header, { IHeaderInfo } from "../../../components/@common/Header";
import NavigationBar from "../../../components/@common/NavigationBar";
import Back from '../../../assets/image/Back.png'
import Bell from '../../../assets/image/Bell.png'
import BookInfo from "../../../components/Book/BookInfo";
import BookSection from "../../../components/Book/BookSection";
import { useTicketInfoStore } from "../../../stores/useTicketInfoStore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useTicketStore from "../../../stores/useTicketStore";
import { toast } from "react-toastify";
import WaittingModal from "../../../components/Book/WaittingModal";

const BookSectionPage = () => {
  const [isWaitModalOpen, setIsWaitModalOpen] = useState(true);
  const gameInfo = useTicketInfoStore((state) => state.modalData);
  const { clearSeatInfo } = useTicketStore();
  const navigate = useNavigate();
  
  useEffect(() => {
    if(!gameInfo?.id) {
        toast.warn('예매 정보가 초기화 되었습니다. 다시 시도해주세요.')
        navigate('/home', {replace: true})
        clearSeatInfo()
    }
}, [])

  const info : IHeaderInfo = {
    left_1:  null,
    left_2: <img src={Back} />,
    center:'예매하기',
    right: <img src={Bell} />
  }

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
      {isWaitModalOpen && <WaittingModal onClose={() => setIsWaitModalOpen(false)}/>}
    </>
  )
}

export default BookSectionPage;