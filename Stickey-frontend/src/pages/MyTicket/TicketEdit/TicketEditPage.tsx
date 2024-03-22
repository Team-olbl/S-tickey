import Header, { IHeaderInfo } from "../../../components/@common/Header";
import NavigationBar from "../../../components/@common/NavigationBar";
import Back from '../../../assets/image/Back.png'
import { useParams } from "react-router-dom";
import Poster from '../../../assets/image/Poster.png'
import Nofilter from '../../../assets/image/NoFilter.png'

interface ITicket {
  id: number;
  gameStartTime: Date;
  stadium: string;
  homeTeam: string;
  awayTeam: string;
  category: string;
  poster: string;
  areaId: string;
  seatNum: number;
  price: number;
  filterId: number;
  backGroundId: number;
}

const TicketEditPage = () => {

  const { id } = useParams<{ id: string }>();

    // id로 api 조회
    const dummyTicket: ITicket = {
      id: Number(id),
      gameStartTime: new Date('2024-03-22T08:00:00'),
      stadium: 'Stadium A',
      homeTeam: 'Home Team A',
      awayTeam: 'Away Team A',
      category: 'Football',
      poster: '',
      areaId: 'S구역 2',
      seatNum: 23,
      price: 50000,
      filterId: 1,
      backGroundId: 1
    };

  const info : IHeaderInfo = {
    left_1:  null,
    left_2: <img src={Back} alt="" />,
    center:'마이티켓 꾸미기',
    right: null,
  }

  return(
    <>
      <Header info={info} />

      {/* 티켓 */}
      <div className="pt-16">
          <div className="h-auto flex flex-col text-center items-center">
              <div className="w-[300px] bg-white rounded-b-lg p-2 font-semibold">
                  <p>{dummyTicket.homeTeam}vs{dummyTicket.awayTeam}</p>
              </div>
              <div className="bg-white rounded-2xl">
                <img className="w-[300px] rounded-3xl p-4" src={Poster} />
              </div>
                <div className="bg-white rounded-t-lg w-[300px] text-center py-4">
                    <p>2024년 04월 02일 {dummyTicket.stadium}</p>
                    <p className="font-bold text-2xl">{dummyTicket.areaId} {dummyTicket.seatNum}번 좌석</p>
                    <p>결제금액 : {dummyTicket.price}</p>
                </div>
            </div>
        </div>

        {/* 필터 섹션 (일단 더미) */}
        <div className="flex justify-center fixed bottom-0 bg-black/50 max-h-2/5  max-w-[500px] w-full">
          
          <div className="pb-24">
            <div className=" grid grid-cols-3">
              <div className="bg-Stickey_Gray h-28 w-24 m-4 rounded-lg">티꾸자리</div>
              <div className="bg-Stickey_Gray h-28 w-24 m-4 rounded-lg">티꾸자리</div>
              <div className="bg-Stickey_Gray h-28 w-24 m-4 rounded-lg">티꾸자리</div>
            </div>

            {/* 필터바 */}
            <div className="fixed bottom-12 bg-[#2E2E3D] max-w-[500px] w-full">
              <div className="flex items-center px-2 pt-3 pb-4">
                <img className="px-3" src={Nofilter} />
                <div className="px-3 text-gray-200">필터</div>
                <div className="px-3 text-gray-200">배경</div>
              </div>
            </div>
          </div>

        </div>

      <NavigationBar />
    </>
  )
}

export default TicketEditPage;