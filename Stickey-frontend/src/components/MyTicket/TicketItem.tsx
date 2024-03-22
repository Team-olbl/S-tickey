import { ITicket } from "./TicketList";

interface TicketItemProps {
    ticket: ITicket;
}


const TicketItem: React.FC<TicketItemProps> = ({ ticket }) => {
    return(
        <>
        <div key={ticket.id}>
            <div>{ticket.homeTeam} vs {ticket.awayTeam}</div>
        </div>
        </>
    )
}
export default TicketItem;