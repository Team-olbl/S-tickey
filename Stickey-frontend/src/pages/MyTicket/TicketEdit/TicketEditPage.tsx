import Header, { IHeaderInfo } from "../../../components/@common/Header";
import NavigationBar from "../../../components/@common/NavigationBar";
import Back from '../../../assets/image/Back.png'

const TicketEditPage = () => {

  const info : IHeaderInfo = {
    left_1:  null,
    left_2: <img src={Back} alt="" />,
    center:'마이티켓 꾸미기',
    right: null,
  }


  return(
    <>
      <Header info={info} />
      <NavigationBar />
    </>
  )
}

export default TicketEditPage;