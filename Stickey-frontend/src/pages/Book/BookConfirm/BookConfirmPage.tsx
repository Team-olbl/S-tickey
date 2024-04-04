import Header, { IHeaderInfo } from '../../../components/@common/Header';
import Bell from '../../../assets/image/Bell.png';
import NavigationBar from '../../../components/@common/NavigationBar';
import Ticket from '../../../assets/image/Tickets.png';
import { useNavigate } from 'react-router-dom';

const BookSuccessPage = () => {
  const info: IHeaderInfo = {
    left_1: null,
    left_2: null,
    center: '예매확인',
    right: <img src={Bell} />,
  };

  const navigate = useNavigate();
  const goMyTicketPage = () => {
    navigate('/mytickets');
  };

  return (
    <>
      <Header info={info} />
      <div>
        <div className="flex flex-col pt-60 justify-center items-center">
          <img className="w-20" src={Ticket} />
          <div className="text-white text-sm font-bold">예매가 완료되었습니다.</div>
          <div className="py-8">
            <button className="bg-Stickey_Main text-xs px-3 py-2 rounded-md" onClick={() => goMyTicketPage()}>
              마이티켓
            </button>
          </div>
        </div>
      </div>
      <NavigationBar />
    </>
  );
};

export default BookSuccessPage;
