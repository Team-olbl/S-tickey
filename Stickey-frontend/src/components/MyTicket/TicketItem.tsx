import React, { useState } from 'react';
import { ITicket } from '../../stores/useTicketSort';
import Poster from '../../assets/image/Poster.png'
import TicketOpenModal from './TicketOpenModal';

export interface TicketItemProps {
    ticket: ITicket; 
}

const TicketItem: React.FC<TicketItemProps> = ({ ticket }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
        <div className='py-2 m-1'>
            <div key={ticket.id}>
                
                {/* 카드 모양 만들기 */}
                <div onClick={() => setIsModalOpen(true)} className="bg-gray-200 p-1 rounded-xl flex flex-col items-center">
                    <p>{ticket.category}{ticket.id}</p>
                    <img className='h-44' src={Poster} alt="Poster"/>
                    <p className="text-xs">ddddd날짜</p>
                    <p className="font-bold">{ticket.areaId} {ticket.seatNum}</p>
                    <p className="text-sm">{ticket.stadium}</p>
                </div>

            </div>
        </div>
        {isModalOpen && <TicketOpenModal />}
    </>
    );
};

export default TicketItem;
