import React, { useEffect, useRef, useState } from 'react';
import TicketOpenModal from './TicketOpenModal';
import dayjs from 'dayjs';
import { ITicket } from './TicketList';
import { motion } from "framer-motion";
export interface TicketItemProps {
    ticket: ITicket; 
}

const TicketItem: React.FC<TicketItemProps> = ({ ticket }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const itemRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        const itemEl = itemRef.current;
    
        const handleTouchMove = (e:TouchEvent) => {
            if (!itemRef.current) return;
            const touch = e.touches[0];
            const { clientWidth, clientHeight } = itemRef.current;
            const offsetX = touch.clientX - itemRef.current.getBoundingClientRect().left;
            const offsetY = touch.clientY - itemRef.current.getBoundingClientRect().top;
            const rotateY = (offsetX / clientWidth) * 50 - 25;
            const rotateX = -((offsetY / clientHeight) * 50 - 25);
            itemRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        };
    
        const handleTouchEnd = () => {
            if (!itemRef.current) return;
            itemRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
        };
    
        itemEl?.addEventListener('touchmove', handleTouchMove);
        itemEl?.addEventListener('touchend', handleTouchEnd);
    
        return () => {
            itemEl?.removeEventListener('touchmove', handleTouchMove);
            itemEl?.removeEventListener('touchend', handleTouchEnd);
        };
    }, []);
    
    // useEffect(() => {
    //     getData();
    // }, [isModalOpen])

    

    return (
        <>
        <div className='py-2 m-1' ref={itemRef}>
            <div key={ticket.tokenId}>
                
                {/* 카드 모양 만들기 */}
                <div onClick={() => setIsModalOpen(true)} className="bg-gray-200 p-1 rounded-xl flex flex-col items-center">
                    <p>{ticket.category}{ticket.tokenId}</p>
                    <img className='h-44' src={ticket.gameImage} alt="gameImage"/>
                    <p className="text-xs">{ dayjs(Number(ticket.gameStartTime) * 1000).format("YYYY/MM/DD HH:mm") }</p>
                    <p className="font-bold">{ticket.zoneName} {ticket.seatNumber.toString()}</p>
                    <p className="text-sm">{ticket.stadium}</p>
                </div>
            </div>
        </div>
            {isModalOpen &&
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity:0}} className="w-full h-full">
                    <TicketOpenModal ticket={ticket} onClose={() => setIsModalOpen(false)} />
                </motion.div>
            }
                    
    </>
    );
};

export default TicketItem;
