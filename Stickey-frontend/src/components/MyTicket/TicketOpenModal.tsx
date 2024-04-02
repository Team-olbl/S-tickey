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
import Warning from '../../assets/image/Warning.png'
import { useAnimate } from "framer-motion";


interface TicketOpenModalProps {
    ticket: ITicket;
    onClose: () => void;
}

const TicketOpenModal: React.FC<TicketOpenModalProps> = ({ ticket, onClose }) => {
    const [isQR, setIsQR] = useState(false);
    const [qr, setQr] = useState("");
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
            const newRotateY = ((offsetX / clientWidth) * 50 - 25);
            const newRotateX = -((offsetY / clientHeight) * 50 - 25);
            currentContainer.style.transform = `perspective(1000px) rotateX(${newRotateX}deg) rotateY(${newRotateY}deg)`;
            currentOverlay.style.backgroundPosition = `${offsetX/5}px ${offsetY/5}px`;
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
            toast.warn("환불 가능 시간대가 아닙니다.");
            return;
        }

        const cancleTicket = async () => {
            const tx = await refundTicket(ticket.tokenId);
            if (tx) {
                const res = await registSeats({ gameId: Number(ticket.gameId), zoneId: Number(ticket.zoneId), seatNumbers: [Number(ticket.seatNumber)], isRefund: true });
                
                if (res.status == 200) {
                    toast.success("환불되었습니다.");
                    onClose();
                    return;
                }
            }
            toast.warn("오류가 발생했습니다.");
        }

        cancleTicket();
    }


    const refundEnd = dayjs((Number(ticket.gameStartTime)) * 1000).subtract(1);

    const createQR = useCallback(async () => {
        if (!isQR) {
            const QRData = {
                    tokenId: ticket.tokenId,
                    Match: ticket.homeTeam + " VS " + ticket.awayTeam,
                    date: dayjs(Number(ticket.gameStartTime) * 1000).format("YYYY년 MM월 DD일 HH시 mm분"),
                    seatInfo: ticket.zoneName + " " + ticket.seatNumber + "번 좌석",
                    price: ticket.price,
                    enable: dayjs().add(15, 'second'),
                    phone
                }
                setQr(`https://api.qrserver.com/v1/create-qr-code/?size=300x250&data=${JSON.stringify(QRData)}`);
        }
    },[])



    const handleQR = () => {
        animate("div", { rotateY: [180, 0]}, { duration: 0.6 })

        setIsQR(!isQR);
        if (isQR) {
            setOnLoad(false);
        } 
        createQR();
    }


    return (
        <div className="z-[1] w-full fixed inset-0 bg-black/70 flex justify-center items-center">
            {/* modal wrapper */}
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg"  ref={scope}>
                {onLoad &&
                    <div className='flex justify-center mb-2 items-center fixed left-0 right-0 rounded-1'
                        style={{ transform : "translateY(-110%)" }}>
                        <img src={Warning} alt="" className="w-8"/>
                        <div>
                            <p className='ml-2 text-sm text-white h-full '>캡처한 이미지로는 입장이 불가능합니다.</p>
                        </div>
                    </div>}
                {/* modal */}
                <div ref={containerRef} className="w-[300px] relative flex flex-col text-center items-center">
                    <div ref={overlayRef} className={`filter${ticket.filterId}`}></div>
                    <div>
                        <div className={`w-[300px] background${ticket.backgroundId} rounded-b-lg p-2 font-semibold`}>
                            <p>{ticket.homeTeam} vs {ticket.awayTeam}</p>
                        </div>
                        <div className={` background${ticket.backgroundId} rounded-2xl`}>
                            <div className='flex ml-2'>
                        </div>
                        {!isQR ?
                        <>
                            <img className={`w-[300px] rounded-3xl p-4 `} src={ticket.gameImage} alt="Game" />
                            <div className="absolute bottom-[200px] right-6">
                                <img onClick={handleEditClick} className="bg-white/50 rounded-full p-2" src={Edit} alt="Edit" />
                            </div>
                        </>
                        :
                        <>
                            <img className="w-[300px] rounded-3xl p-4" src={qr} onLoad={() => setOnLoad(true)} />
                            {onLoad && <GetTime createQR={createQR}></GetTime>}
                        </>
                        }
                        </div>
                        <div className={`background${ticket.backgroundId} rounded-t-lg w-[300px] text-center py-2`}>
                            <p>{dayjs(Number(ticket.gameStartTime) * 1000).format('YYYY/MM/DD HH:mm')} {ticket.stadium}</p>
                            <p className="font-bold text-2xl">{ticket.zoneName} {ticket.seatNumber}번 좌석</p>
                            <p>결제금액 : {toEther(ticket.price)} ETH</p>
                            <div className="px-4 py-3 flex justify-center">
                                <button className="z-[1] bg-gray-400 w-1/2 mx-1 p-2 rounded-md text-white font-bold"  onClick={handleQR}>QR전환</button>
                                <button onClick={handleRefund} className="z-[1] bg-gray-400 w-1/2 mx-1 p-2 rounded-md text-white font-bold">환불하기</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full flex justify-center mt-6">
                    <div onClick={onClose} className="flex justify-center items-center h-12 w-12 bg-white rounded-full cursor-pointer">
                        <img className="w-12 h-12" src={X} alt="Close" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TicketOpenModal;
