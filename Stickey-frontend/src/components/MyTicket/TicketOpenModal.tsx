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
import { useAnimate } from 'framer-motion';
import { createPortal } from 'react-dom';
import useSpinner from '../../stores/useSpinner';

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
  const { setIsLoading, unSetIsLoading } = useSpinner();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentContainer = containerRef.current;
    const currentOverlay = overlayRef.current;

    const handleTouchMove = (e: TouchEvent) => {
      if (!currentContainer || !currentOverlay) return;
      const touch = e.touches[0];
      const offsetX = touch.clientX - currentContainer.getBoundingClientRect().left;
      const offsetY = touch.clientY - currentContainer.getBoundingClientRect().top;
      const newRotateY = offsetX / 5 + 20;
      const newRotateX = -((offsetY / 30) * 4 - 20);
      currentContainer.style.transform = `perspective(800px) rotateX(${newRotateX}deg) rotateY(${newRotateY}deg)`;
      currentOverlay.style.backgroundPosition =
        `filter${ticket.filterId}` === 'filter1' ? `${offsetX / 2}px` : `${offsetX / 5}px ${offsetY / 5}px`;
    };

    const handleTouchEnd = () => {
      if (!currentContainer || !currentOverlay) return;
      currentContainer.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
      currentOverlay.style.backgroundPosition = `0px 0px`;
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
      setIsLoading();
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
        } else {
          toast.warn('오류가 발생했습니다.');
        }
      }
      unSetIsLoading();
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
    setQr(`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${JSON.stringify(QRData)}`);
  }, []);

  const handleQR = () => {
    setIsQR(!isQR);
    if (isQR) {
      animate('div:not(.preventRotate)', { rotateY: [180, 0] }, { duration: 0.6 });
      setOnLoad(false);
    } else {
      setIsLoading();
      createQR();
    }
  };

  const handleLoad = () => {
    unSetIsLoading();
    setOnLoad(true);
    if (!onLoad) animate('div:not(.preventRotate)', { rotateY: [180, 0] }, { duration: 0.6 });
  };

  return createPortal(
    <>
      <div className="fixed top-0 w-full h-full max-w-[500px] bottom-0 bg-black/70 z-[2]">
        {/* modal wrapper */}
        <div className="flex justify-center items-center rounded-lg pt-16" ref={scope}>
          <div className="flex justify-center">
            <div className="flex flex-col justify-center items-center w-[80%]">
              <div ref={containerRef} className="text-center relative">
                <div ref={overlayRef} className={`filter${ticket.filterId}`}></div>
                <div>
                  <div className={`background${ticket.backgroundId} rounded-b-lg p-2 font-semibold`}>
                    <p>
                      {ticket.homeTeam} vs {ticket.awayTeam}
                    </p>
                  </div>
                  <div className={` background${ticket.backgroundId} rounded-2xl`}>
                    <div className="flex ml-2"></div>

                    {!onLoad && (
                      <div className="flex justify-center max-w-[300px] h-auto">
                        <img className={`rounded-3xl p-4 w-full`} src={ticket.gameImage} alt="Game" />
                      </div>
                    )}

                    {isQR && (
                      <div className={`max-w-[300px] h-auto  ${onLoad && `p-2`} ${!onLoad && `hidden`}`}>
                        <img className={`rounded-3xl ${onLoad && `p-8`}`} src={qr} onLoad={handleLoad} />
                        {onLoad && <GetTime createQR={createQR}></GetTime>}
                      </div>
                    )}
                  </div>
                  <div className={`background${ticket.backgroundId} rounded-t-lg text-center p-2`}>
                    <p className="text-sm p-1">
                      {dayjs(Number(ticket.gameStartTime) * 1000).format('YY/MM/DD HH:mm')} <br />
                      {ticket.stadium}
                    </p>
                    <p className="font-bold text-2xl">
                      {ticket.zoneName} {ticket.seatNumber}번 좌석
                    </p>
                    <p>결제금액 : {toEther(ticket.price)} ETH</p>
                    <div className="px-4 py-2 flex justify-center">
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
            </div>
          </div>

          <div className="fixed right-4 top-20 preventRotate">
            <div
              onClick={onClose}
              className="flex my-2 justify-center items-center h-8 w-8 bg-white/50 rounded-full cursor-pointer preventRotate"
            >
              <img className="w-8 h-8" src={X} alt="Close" />
            </div>
            {!onLoad && (
              <img
                onClick={handleEditClick}
                className=" h-8 w-8 bg-white/50 rounded-full p-2"
                src={Edit}
                alt="Edit"
                id="edit"
              />
            )}
          </div>
        </div>
      </div>
    </>,
    document.getElementById('root')!,
  );
};

export default TicketOpenModal;
