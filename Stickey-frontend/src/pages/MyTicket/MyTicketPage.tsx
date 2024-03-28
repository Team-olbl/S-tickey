import Header, { IHeaderInfo } from "../../components/@common/Header";
import NavigationBar from "../../components/@common/NavigationBar";
import Bell from '../../assets/image/Bell.png'
import TicketList from "../../components/MyTicket/TicketList";


const MyTicketPage = () => {


  const info : IHeaderInfo = {
    left_1:  null,
    left_2: null,
    center:'마이티켓',
    right: <img src={Bell} />
  }
  
  return(
    <>
      <Header info={info} />
      {/* 티켓 불러오기 */}
      <TicketList />
      <NavigationBar />
    </>
  )
}

export default MyTicketPage;