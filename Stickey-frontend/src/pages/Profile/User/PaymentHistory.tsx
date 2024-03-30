import Header, { IHeaderInfo } from "../../../components/@common/Header";
import NavigationBar from "../../../components/@common/NavigationBar";
import PaymentItem from "../../../components/Profile/User/Payment/PaymentItem";
import Back from '../../../assets/image/Back.png'
import Bell from '../../../assets/image/Bell.png'
import { Fragment, useEffect, useState } from "react";
import { connect, getPaymentHistory } from "../../../service/web3/api";
import dayjs from "dayjs";


export type PaymentItemData = {
  paymentType: number;
  amount: bigint;
  time: bigint;
  ticketPayment: {
    gameId: number;
    awayTeam: string;
    homeTeam: string;
    gameStartTime: number;
    stadium: string;
    zoneName: string;
    seatNumber: number[];
  }
  supportName: string;
  supportText: string;
};


const PaymentHistoryPage = () => {

  const [paymentHistroy, setPaymentHistory] = useState<PaymentItemData[]>([]);
  const dateSet = new Set();

  useEffect(() => {
    async function getData() {
      await connect();
      const data : PaymentItemData[] | undefined = await getPaymentHistory();
      if(data)
        setPaymentHistory(data);
    }
    getData();
  }, []);
  
  
  const info : IHeaderInfo = {
    left_1: null,
    left_2: <img src={Back} />,
    center: '결제내역',
    right: <img src={Bell} />
  }


  const displayDate = (value : number) => {
    if (!dateSet.has(Math.floor(value / 86400))) {
      dateSet.add(Math.floor(value / 86400));
      return (
        <div className="text-white ps-3">{dayjs(value * 1000).format("YYYY-MM-DD")}</div>
      )
    }
  }

  return(
    <>
      <Header info={info} />
      <div className="pt-16 pb-16">
        {paymentHistroy.length > 0 ?
          paymentHistroy && paymentHistroy.map((item, idx) => {
          return (
            <Fragment key={idx}>
              
              {displayDate( Number(item.time))} 
            <PaymentItem data={item} />
          </Fragment>)
          }) :
          <div className="flex flex-col items-center mt-40">
            <p className=" text-white text-sm mt-4">아직 기록이 없어요!</p>
          </div>
        }
      </div>
      <NavigationBar />
    </>
  )
}

export default PaymentHistoryPage;