import React, { useState } from 'react';
import { ITicket } from '../../pages/MyTicket/MyTicketPage';
import Poster from '../../assets/image/Poster.png'
import TicketOpenModal from './TicketOpenModal';
import dayjs from 'dayjs';

export interface TicketItemProps {
    ticket: ITicket; 
}

const TicketItem: React.FC<TicketItemProps> = ({ ticket }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
        <div className='py-2 m-1'>
            <div key={ticket.tokenId}>
                
                {/* 카드 모양 만들기 */}
                <div onClick={() => setIsModalOpen(true)} className="bg-gray-200 p-1 rounded-xl flex flex-col items-center">
                    <p>{ticket.category}{ticket.tokenId}</p>
                    <img className='h-44' src={ticket.gameImage} alt="gameImage"/>
                        <p className="text-xs">{ dayjs(Number(ticket) * 1000).format("YYYY년 MM월 DD일 HH:mm:ss") }</p>
                    <p className="font-bold">{ticket.zoneName} {ticket.seatNumber}</p>
                    <p className="text-sm">{ticket.stadium}</p>
                </div>

            </div>
        </div>
        {isModalOpen && <TicketOpenModal ticket={ticket} onClose={() => setIsModalOpen(false)} />}
    </>
    );
};

export default TicketItem;
