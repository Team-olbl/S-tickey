import Calendar from "../../../components/@common/Calendar";
import Header, { IHeaderInfo } from "../../../components/@common/Header";
import NavigationBar from "../../../components/@common/NavigationBar";
import PaymentItem from "../../../components/Profile/User/Payment/PaymentItem";
import Back from '../../../assets/image/Back.png'
import Bell from '../../../assets/image/Bell.png'
import { Fragment, useEffect, useState } from "react";
import { connect, getPaymentHistory } from "../../../service/web3/api";
import dayjs from "dayjs";

// TODO 실제 데이터로 변경해야함 

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

const dateSet = new Set();

const PaymentHistoryPage = () => {

  const [paymentHistroy, setPaymentHistory] = useState<PaymentItemData[]>([]);

  useEffect(() => {
    async function getData() {
      await connect();
      const data = await getPaymentHistory();
      setPaymentHistory(data);
    }
    getData();
  }, []);
  
  


  // const today= new Date();
  // const [selectedDate, setSelectedDate] = useState<number>(today.getDate());
  // const [selectedMonth, setSelectedMonth] = useState<number>(today.getMonth());
  // const [selectedYear, setSelectedYear] = useState<number>(today.getFullYear());
  
  const info : IHeaderInfo = {
    left_1: null,
    left_2: <img src={Back} />,
    center: '결제내역',
    right: <img src={Bell} />
  }

  // const handleDateClick = (day: number, month: number, year: number) => {
  //   setSelectedDate(day);
  //   setSelectedMonth(month -1);
  //   setSelectedYear(year);
  // };



  // const dummies:PaymentItemData[] =[
  //       {
  //         // 예매 정보
  //         "booking_info" : {
  //           "id" : 1,
  //           "book_number" : "0278954213854",
  //           "book_date" : "2024-03-22T18:01:00",
  //           "count" : 2,
  //           "book_status" : true,
  //           "cancel_deadline" : "2024-03-28T23:59:00", // 취소 기한
  //           "cancel_date" : "", // 취소 일시
  //           "cancel_fee" : 0, // 환불 금액
  //           },
  //         // 티켓 정보
  //         "ticket_info" : {
  //             "seats" : [
  //               {
  //                 "row" : 7,
  //                 "col" : 3,
  //                 "price" : 15000
  //               },
  //               {
  //                 "row" : 7,
  //                 "col" : 3,
  //                 "price" : 15000
  //               },
  //               {
  //                 "row" : 7,
  //                 "col" : 3,
  //                 "price" : 15000
  //               },
  //               {
  //                 "row" : 7,
  //                 "col" : 4,
  //                 "price" : 15000
  //               }
  //             ]
  //         },
  //         "game_info" : {
  //           "stadium_name" : "DGB 대구은행파크",
  //           "home_team" : "서울FC",
  //           "away_team" : "대구FC",
  //           "game_start_time" : "2024-03-29T17:00:00",
  //         },
  //         "payment_info" : {
  //           "payment_id" : 1,
  //           "total_price" : 32000
  //         }
  //       },
  //       {
  //         // 예매 정보
  //         "booking_info" : {
  //           "id" : 1,
  //           "book_number" : "0278954213854",
  //           "book_date" : "2024-02-29T18:01:00",
  //           "count" : 2,
  //           "book_status" : false,
  //           "cancel_deadline" : "2024-03-01T23:59:00", // 취소 기한
  //           "cancel_date" : "2024-03-01T22:00:00", // 취소 일시
  //           "cancel_fee" : 30000, // 환불 금액
  //           },
  //         // 티켓 정보
  //         "ticket_info" : {
  //             "seats" : [
  //               {
  //                 "row" : 7,
  //                 "col" : 3,
  //                 "price" : 15000
  //               },
  //               {
  //                 "row" : 7,
  //                 "col" : 3,
  //                 "price" : 15000
  //               },
  //               {
  //                 "row" : 7,
  //                 "col" : 3,
  //                 "price" : 15000
  //               },
  //               {
  //                 "row" : 7,
  //                 "col" : 4,
  //                 "price" : 15000
  //               }
  //             ]
  //         },
  //         "game_info" : {
  //           "stadium_name" : "DGB 대구은행파크",
  //           "home_team" : "서울FC",
  //           "away_team" : "대구FC",
  //           "game_start_time" : "2024-03-07T17:00:00",
  //         },
  //         "payment_info" : {
  //           "payment_id" : 1,
  //           "total_price" : 32000
  //         }
  //       },
  // ]

  // const filteredMatches = dummies.filter((match) => {
  //   const matchDate = new Date(match.booking_info.book_date);
  //   return (
  //     matchDate.getDate() === selectedDate &&
  //     matchDate.getMonth() === selectedMonth &&
  //     matchDate.getFullYear() === selectedYear
  //   );
  // });

  const displayDate = (value : number) => {
    if (!dateSet.has(Math.floor(value / 8640))) {
      dateSet.add(Math.floor(value / 8640));
      return (
        <div className="text-white ps-3">{dayjs(value * 1000).format("YYYY-MM-DD")}</div>
      )
    }
  }

  return(
    <>
      <Header info={info} />
      <div className="pt-16">
        {paymentHistroy && paymentHistroy.map((item, idx) => {
          return (
            <Fragment key={idx}>
              
              {displayDate( Number(item.time))} 
            <PaymentItem data={item} />
          </Fragment>)
        })
        }
      </div>
      {/* <div className="pt-16">
        <Calendar onDateClick={handleDateClick} />
        {filteredMatches.map((item, id) => (
          <PaymentItem data={item} key={id} />
        ))}
      </div> */}
      <NavigationBar />
    </>
  )
}

export default PaymentHistoryPage;