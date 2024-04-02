import Header, { IHeaderInfo } from "../../../components/@common/Header";
import NavigationBar from "../../../components/@common/NavigationBar";
import Back from '../../../assets/image/Back.png'
import { useLocation } from "react-router-dom";
import Nofilter from '../../../assets/image/NoFilter.png'
import { toEther } from "../../../service/web3/api";
import dayjs from "dayjs";
import { useState } from "react";
import './styles.css'
import BuyingModal from "../../../components/MyTicket/BuyingModal";
import glitterImage from '../../../assets/image/glitter.gif';

const TicketEditPage = () => {
  const location = useLocation();
  const ticket = location.state?.ticket;
  const [selectedTab, setSelectedTab] = useState('filter');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleTabChange = (tabName: string) => {
    setSelectedTab(tabName);
  };

  const handleModalOpen = () => {
    setIsModalOpen(true)
  }

  const backgrounds = [
    { color: "bg-white", image: ticket.gameImage, backgroundImage: ''},
    { color: "bg-black", image: ticket.gameImage, backgroundImage: '' },
    { color: "bg-[#dc143c]", image: ticket.gameImage, backgroundImage: '' },
    { color: "bg-[#ffffcc]", image: ticket.gameImage, backgroundImage: '' },
    { color: "bg-[#6495ed]", image: ticket.gameImage, backgroundImage: '' },
    { color: '', image: ticket.gameImage, backgroundImage: `url(${glitterImage})`}
  ];

  const filters = [
    { name: 'Holo Gradient', gradientClass: 'filter0' },
    { name: 'Holo Gradient', gradientClass: 'filter1' },
    { name: 'Holo Gradient 2', gradientClass: 'filter2'},
  ];

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
      <div className={`pt-16`}  >
        <div className={`relative h-auto flex flex-col text-center items-center`}>
          <div className={`filter${ticket.filterId}`}></div>
          <div>
            <div className={`w-[300px] background${ticket.backgroundId} rounded-b-lg p-2 font-semibold`}>
                <p>{ticket.homeTeam}vs{ticket.awayTeam}</p>
            </div>
            <div className={`background${ticket.backgroundId} rounded-2xl`}>
              <img className="w-[300px] rounded-3xl p-4" src={ticket.gameImage} />
            </div>
            <div className={`background${ticket.backgroundId} rounded-t-lg w-[300px] text-center py-4`}>
                <p>{ dayjs(Number(ticket.gameStartTime) * 1000).format("YY년 MM월 DD일 HH:mm") } {ticket.stadium}</p>
                <p className="font-bold text-2xl">{ticket.zoneName} {ticket.seatNumber.toString()}번 좌석</p>
                <p>결제금액 : {toEther(ticket.price)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 필터 섹션 (일단 더미) */}
      <div className="fixed bottom-0 bg-black/40 max-h-2/5  max-w-[500px] w-full">
        <div className="pb-24 flex justify-center">


          {/* 필터바 */}
          <div className="fixed bottom-12 bg-[#2E2E3D] max-w-[500px] w-full">
            <div className="flex w-full max-w-[500px] items-center px-2 pt-3 pb-4">
              <img className="px-3" src={Nofilter} />
              <div className="px-3 text-gray-200" onClick={() => handleTabChange('filter')}>필터</div>
              <div className="px-3 text-gray-200" onClick={() => handleTabChange('background')}>배경</div>
            </div>
          </div>
          {selectedTab === 'filter' && (
            <div className="flex gap-2 p-4" onClick={handleModalOpen}>
              {filters.map((filter, index) => (
              <div key={index} >
                <button className="bg-Stickey_Gray h-28 w-24 rounded-lg flex items-center justify-center relative">
                  <div className="h-auto flex flex-col justify-start items-center">
                    <div className="w-12 bg-white rounded-b-lg p-1 font-semibold"></div>
                    <div className=" bg-white rounded-xl relative">
                      <img className="w-12 rounded-2xl p-2" src={ticket.gameImage} />
                      <div className={`absolute inset-0 ${filter.gradientClass} rounded-xl`}></div>
                    </div>
                    <div className="w-12 bg-white rounded-t-lg p-1 font-semibold"></div>
                  </div>
                </button>
              </div>
              ))}
            </div>
          )}
          {selectedTab === 'background' && (
            <div className="flex w-full gap-2 p-4 overflow-auto" onClick={handleModalOpen}>
              {backgrounds.map((background, index) => (
              <div key={index}>
                <button className="bg-Stickey_Gray h-28 w-24 rounded-lg flex items-center justify-center relative">
                  <div className="h-auto flex flex-col justify-start items-center" >
                    <div className={`w-12 ${background.color} rounded-b-lg p-1 font-semibold`} style={{backgroundImage: background.backgroundImage}}></div>
                    <div className={`${background.color} rounded-xl`} style={{backgroundImage: background.backgroundImage}}>
                      <img className="w-12 rounded-2xl p-2" src={ticket.gameImage} />
                    </div>
                    <div className={`w-12 ${background.color} rounded-t-lg p-1 font-semibold`} style={{backgroundImage: background.backgroundImage}}></div>
                  </div>
                </button>
              </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {isModalOpen && <BuyingModal onClose={() => setIsModalOpen(false)} />}
      <NavigationBar />
    </>
  )
}

export default TicketEditPage;