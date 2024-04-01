import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { ITicket } from './TicketList';
import { refundTicket, toEther } from '../../service/web3/api';
import { registSeats } from '../../service/Book/api';
import { toast } from 'react-toastify';
import X from '../../assets/image/XCircle.png';
import Edit from '../../assets/image/Edit.png';
import { useEffect } from 'react';
import '../../pages/MyTicket/TicketEdit/styles.css';

interface TicketOpenModalProps {
    ticket: ITicket;
    onClose: () => void;
}

const TicketOpenModal: React.FC<TicketOpenModalProps> = ({ ticket, onClose }) => {
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
            currentOverlay.style.backgroundPosition = `${offsetX/3}px ${offsetY/3}px`;
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
    

    const handleEditClick = () => {
        navigate(`/mytickets/${ticket.tokenId}/edit`, { state: { ticket } });
    };

    const handleRefund = async () => {
        const refundEnd = dayjs(Number(ticket.gameStartTime) * 1000).subtract(1);
        if (refundEnd <= dayjs()) {
            alert('환불 가능 시간대가 아닙니다.');
            return;
        }

        if (!window.confirm('정말 환불하시겠습니까?')) return;

        const tx = await refundTicket(ticket.tokenId);
        if (tx) {
            const res = await registSeats({
                gameId: Number(ticket.gameId),
                zoneId: Number(ticket.zoneId),
                seatNumbers: [Number(ticket.seatNumber)],
                isRefund: true,
            });

            if (res.status === 200) {
                toast.success('환불되었습니다.');
                onClose();
                return;
            }
        }
        toast.warn('오류가 발생했습니다.');
    };

    return (
        <div className="z-[1] w-full fixed inset-0 bg-black/80 flex justify-center items-center">
            {/* modal wrapper */}
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg">
                {/* modal */}
                <div ref={containerRef} className="relative transition-all-0.1s flex flex-col text-center items-center">
                    <div ref={overlayRef} className={`filter${ticket.filterId}`}></div>
                    <div>
                        <div className={`w-[300px] background${ticket.backgroundId} rounded-b-lg p-2 font-semibold`}>
                            <p>{ticket.homeTeam}vs{ticket.awayTeam}</p>
                        </div>
                        <div className={` background${ticket.backgroundId} rounded-2xl`}>
                            <img className="w-[300px] rounded-3xl p-4" src={ticket.gameImage} alt="Game" />
                            <div className="absolute bottom-[200px] right-6">
                                <img onClick={handleEditClick} className="bg-white/50 rounded-full p-2" src={Edit} alt="Edit" />
                            </div>
                        </div>
                        <div className={`background${ticket.backgroundId} rounded-t-lg w-[300px] text-center py-2`}>
                            <p>{dayjs(Number(ticket.gameStartTime) * 1000).format('YYYY/MM/DD HH:mm')} {ticket.stadium}</p>
                            <p className="font-bold text-2xl">{ticket.zoneName} {ticket.seatNumber}번 좌석</p>
                            <p>결제금액 : {toEther(ticket.price)}</p>
                            <div className="px-4 py-3 flex justify-center">
                                <button className="bg-gray-400 w-1/2 mx-1 p-2 rounded-md text-white font-bold">QR보기</button>
                                <button onClick={handleRefund} className="bg-gray-400 w-1/2 mx-1 p-2 rounded-md text-white font-bold">환불하기</button>
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
