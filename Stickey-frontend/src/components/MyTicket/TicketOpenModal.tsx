import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { ITicket } from './TicketList';
import { refundTicket, toEther } from '../../service/web3/api';
import { registSeats } from '../../service/Book/api';
import { toast } from 'react-toastify';
import X from '../../assets/image/XCircle.png';
import Edit from '../../assets/image/Edit.png';
import '../../pages/MyTicket/TicketEdit/styles.css';
import { useCallback, useState, useEffect } from 'react';
import userStore from '../../stores/userStore';
import GetTime from './GetTime';
import Warning from '../../assets/image/Warning.png';
import { useAnimate } from 'framer-motion';

interface TicketOpenModalProps {
  ticket: ITicket;
  onClose: () => void;
  getData: () => void;
}

const TicketOpenModal: React.FC<TicketOpenModalProps> = ({ ticket, onClose, getData }) => {
  const [isQR, setIsQR] = useState(false);
  const [qr, setQr] = useState('');
  const [onLoad, setOnLoad] = useState(false);
  const { phone } = userStore();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentContainer = containerRef.current;
    const currentOverlay = overlayRef.current;

    const handleTouchMove = (e: TouchEvent) => {
      if (!currentContainer || !currentOverlay) return;
      const touch = e.touches[0];
      const { clientWidth, clientHeight } = currentContainer;
      const offsetX = touch.clientX - currentContainer.getBoundingClientRect().left;
      const offsetY = touch.clientY - currentContainer.getBoundingClientRect().top;
      const newRotateY = (offsetX / clientWidth) * 50 - 25;
      const newRotateX = -((offsetY / clientHeight) * 50 - 25);
      currentContainer.style.transform = `perspective(1000px) rotateX(${newRotateX}deg) rotateY(${newRotateY}deg)`;
      currentOverlay.style.backgroundPosition = `${offsetX / 5}px ${offsetY / 5}px`;
    };

    const handleTouchEnd = () => {
      if (!currentContainer || !currentOverlay) return;
      currentContainer.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
      // currentOverlay.style.filter = `opacity(0)`;
    };

    currentContainer?.addEventListener('touchmove', handleTouchMove);
    currentContainer?.addEventListener('touchend', handleTouchEnd);
    currentOverlay?.addEventListener('touchend', handleTouchEnd);

    return () => {
      currentContainer?.removeEventListener('touchmove', handleTouchMove);
      currentContainer?.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);
  const [scope, animate] = useAnimate();

  const handleEditClick = () => {
    navigate(`/mytickets/${ticket.tokenId}/edit`, { state: { ticket } });
  };

  const handleRefund = () => {
    if (refundEnd <= dayjs()) {
      toast.warn('환불 가능 시간대가 아닙니다.');
      return;
    }

    const cancleTicket = async () => {
      const tx = await refundTicket(ticket.tokenId);
      if (tx) {
        const res = await registSeats({
          gameId: Number(ticket.gameId),
          zoneId: Number(ticket.zoneId),
          seatNumbers: [Number(ticket.seatNumber)],
          isRefund: true,
        });

        if (res.status == 200) {
          getData();
          toast.success('환불되었습니다.');
          onClose();
          return;
        }
      }
      toast.warn('오류가 발생했습니다.');
    };
    cancleTicket();
  };

  const refundEnd = dayjs(Number(ticket.gameStartTime) * 1000).subtract(1);

  const createQR = useCallback(async () => {
    const QRData = {
      tokenId: ticket.tokenId,
      Match: ticket.homeTeam + ' VS ' + ticket.awayTeam,
      date: dayjs(Number(ticket.gameStartTime) * 1000).format('YYYY년 MM월 DD일 HH시 mm분'),
      seatInfo: ticket.zoneName + ' ' + ticket.seatNumber + '번 좌석',
      price: ticket.price,
      enable: dayjs().add(15, 'second'),
      phone,
    };
    setQr(`https://api.qrserver.com/v1/create-qr-code/?size=300x250&data=${JSON.stringify(QRData)}`);
  }, []);

  const handleQR = () => {
    setIsQR(!isQR);
    if (isQR) {
      animate('div', { rotateY: [180, 0] }, { duration: 0.6 });
      setOnLoad(false);
    } else {
      createQR();
    }
  };

  const handleLoad = () => {
    setOnLoad(true);
    if (!onLoad) animate('div', { rotateY: [180, 0] }, { duration: 0.6 });
  };

  return (
    <>
      <div className="fixed top-0 w-full h-screen max-w-[500px] bottom-0 bg-black/70 z-[2]">
        {/* modal wrapper */}
        <div className="flex justify-center items-center rounded-lg pt-16" ref={scope}>
          <div className="flex justify-center">
            {onLoad && (
              <div
                className="flex justify-center mb-2 items-center fixed left-0 right-0 rounded-1"
                style={{ transform: 'translateY(-110%)' }}
              >
                <img src={Warning} alt="" className="w-8" />
                <div>
                  <p className="ml-2 text-sm text-white h-full ">캡처한 이미지로는 입장이 불가능합니다.</p>
                </div>
              </div>
            )}
            {/* modal */}
            <div className="flex flex-col justify-center items-center w-[80%]">
              <div
                ref={containerRef}
                className="text-center"
                style={{ transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)' }}
              >
                <div ref={overlayRef} className={`filter${ticket.filterId} w-full h-full fixed`}></div>
                <div>
                  <div className={`background${ticket.backgroundId} rounded-b-lg p-2 font-semibold`}>
                    <p>
                      {ticket.homeTeam} vs {ticket.awayTeam}
                    </p>
                  </div>
                  <div className={` background${ticket.backgroundId} rounded-2xl`}>
                    <div className="flex ml-2"></div>
                    {!isQR ? (
                      <div className="flex justify-center max-w-[300px] h-auto">
                        <img className={`rounded-3xl p-4 w-full`} src={ticket.gameImage} alt="Game" />
                        <img
                          onClick={handleEditClick}
                          className="fixed right-6 mt-6 bg-white/70 w-7 h-7 rounded-full p-1"
                          src={Edit}
                          alt="Edit"
                        />
                      </div>
                    ) : (
                      <div>
                        <img className={`rounded-3xl p-4 ${onLoad && `p-12`}`} src={qr} onLoad={handleLoad} />
                        {onLoad && <GetTime createQR={createQR}></GetTime>}
                      </div>
                    )}
                  </div>
                  <div className={`background${ticket.backgroundId} rounded-t-lg text-center p-2`}>
                    <p className="text-sm p-1">
                      {dayjs(Number(ticket.gameStartTime) * 1000).format('YY/MM/DD HH:mm')} {ticket.stadium}
                    </p>
                    <p className="font-bold text-2xl">
                      {ticket.zoneName} {ticket.seatNumber}번 좌석
                    </p>
                    <p>결제금액 : {toEther(ticket.price)} ETH</p>
                    <div className="px-4 py-3 flex justify-center">
                      <button className="z-[1] bg-gray-400 mx-1 p-2 rounded-md text-white" onClick={handleQR}>
                        QR 전환
                      </button>
                      <button onClick={handleRefund} className="z-[1] bg-gray-400 mx-1 p-2 rounded-md text-white">
                        환불하기
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full flex justify-center mt-2">
                <div
                  onClick={onClose}
                  className="flex justify-center items-center h-10 w-10 bg-white rounded-full cursor-pointer"
                >
                  <img className="w-8 h-8" src={X} alt="Close" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TicketOpenModal;
