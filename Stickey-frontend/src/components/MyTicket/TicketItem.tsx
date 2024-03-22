import React from 'react';
import { ITicket } from '../../stores/useTicketSort';
import Poster from '../../assets/image/Poster.png'

export interface TicketItemProps {
    ticket: ITicket; 
}

const TicketItem: React.FC<TicketItemProps> = ({ ticket }) => {
    return (
        <div className="w-full" key={ticket.id}>

            {/* 카드 모양 만들기 */}
            <div className="bg-gray-200 rounded-lg px-2 py-1 text-sm">
                <p>{ticket.category}{ticket.id}</p>
            </div>

            <div className="bg-gray-200 p-4 rounded-xl">
                <img src={Poster} alt="Poster"/>
            </div>

            <div className="bg-gray-200 p-2 rounded-lg text-center">
                <div className="text-xs">ddddd날짜</div>
                <div className="font-bold">{ticket.areaId} {ticket.seatNum}</div>
                <div className="text-sm">{ticket.stadium}</div>
            </div>
        </div>
    );
};

export default TicketItem;
