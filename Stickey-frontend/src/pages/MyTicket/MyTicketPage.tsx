import Header, { IHeaderInfo } from "../../components/@common/Header";
import NavigationBar from "../../components/@common/NavigationBar";
import Bell from '../../assets/image/Bell.png'
import TicketList from "../../components/MyTicket/TicketList";
import { useEffect, useState } from "react";
import { connect, getTickets } from "../../service/web3/api";

export interface ITicket {
  tokenId: number;
  gameId: number;
  gameStartTime: number;
  stadium: string;
  category: number;
  homeTeam: string;
  awayTeam: string;
  gameImage: string;
  zoneName: string;
  seatNumber: number;
  price: bigint;
}



const MyTicketPage = () => {

  const [myTickets, setMyTickets] = useState<ITicket[]>([]);

  useEffect(() => {
    async function getData() {
      await connect();
      const data = await getTickets();
      console.log(data);
      setMyTickets(data);
    }
    getData();
  }, []);

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
      <TicketList data={myTickets} />
      <NavigationBar />
    </>
  )
}

export default MyTicketPage;