import TicketItem from "./TicketItem";
import { useTicketSort } from "../../stores/useTicketSort";

const TicketList = () => {

    const { tickets, showUpcoming, toggleShowUpcoming } = useTicketSort();
    
    const filteredTickets = showUpcoming
        ? tickets.filter((ticket) => new Date(ticket.gameStartTime) > new Date())
        : tickets;

    return(
        <>
            <div className="pt-16">
                <div className="px-4">
                <button
                    onClick={toggleShowUpcoming}
                    className="border text-white text-sm w-20 py-1 rounded-2xl"
                >
                    {showUpcoming ? '전체' : '사용전'}
                </button></div>
                <div className="pt-4 pb-16 flex flex-wrap justify-center">
                {filteredTickets.map((ticket) => (
                    <TicketItem key={ticket.id} ticket={ticket} />
                ))}
                </div>
            </div>
        </>
    )
}
export default TicketList;
