import { ITicket } from "./TicketList";
import Poster from '../../assets/image/Poster.png'

interface TicketItemProps {
    ticket: ITicket;
}


const TicketItem: React.FC<TicketItemProps> = ({ ticket }) => {
    return(
        <>
        <div key={ticket.id}>

            {/* 카드 모양 만들기 */}
            <div>

                <div className="bg-gray-200 rounded-lg px-2 py-1 text-sm"><p>{ticket.category}{ticket.id}</p></div>
        
                <div className="bg-gray-200 p-4 rounded-xl"><img className="" src={Poster} /></div>

                <div className="bg-gray-200 p-2 rounded-lg text-center">
                    <div className="text-xs">{ticket.gameStartTime}</div>
                    <div className="font-bold">{ticket.areaId} {ticket.seatNum}</div>
                    <div className="text-sm">{ticket.stadium}</div>
                </div>
            </div>

        </div>
        </>
    )
}
export default TicketItem;