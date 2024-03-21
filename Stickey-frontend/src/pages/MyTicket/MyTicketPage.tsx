import Header, { IHeaderInfo } from "../../components/@common/Header";
import NavigationBar from "../../components/@common/NavigationBar";
import Bell from '../../assets/image/Bell.png'

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
      <NavigationBar />
    </>
  )
}

export default MyTicketPage;