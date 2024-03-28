import TicketItem from "./TicketItem";
import { ITicket } from "../../pages/MyTicket/MyTicketPage";
import { useState } from "react";

interface TicketProps {
    data: ITicket[];
  }

const TicketList = ({ data }: TicketProps) => {
    const [showUpcoming, setShowUpcoming] = useState<boolean>(false);

    console.log(data);
    
    const filteredTickets = showUpcoming
        ? data.filter((item) => new Date(Number(item.gameStartTime) * 1000) > new Date())
        : data;

    return(
        <>
            <div className="pt-16">
                <div className="px-4">
                <button
                    onClick={() => setShowUpcoming(!showUpcoming)}
                    className="border text-white text-sm w-20 py-1 rounded-2xl"
                >
                    {showUpcoming ? '전체' : '사용전'}
                </button></div>
                <div className="pt-4 pb-16 flex flex-wrap justify-center">
                {filteredTickets.map((ticket) => (
                    <TicketItem key={ticket.tokenId} ticket={ticket} />
                ))}
                </div>
            </div>
        </>
    )
}
export default TicketList;
