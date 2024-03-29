import { connect, getTickets } from "../../service/web3/api";
import TicketItem from "./TicketItem";
import { useCallback, useEffect, useState } from "react";

export interface ITicket {
    tokenId: number;
    gameId: number;
    gameStartTime: number;
    stadium: string;
    category: number;
    homeTeam: string;
    awayTeam: string;
    gameImage: string;
    zoneId: number;
    zoneName: string;
    seatNumber: number;
    price: bigint;
}


const TicketList = () => {
    const [showUpcoming, setShowUpcoming] = useState<boolean>(false);
    const [myTickets, setMyTickets] = useState<ITicket[]>([]);
    
    const getData = useCallback(async () => {
        await connect();
        const data = await getTickets();
        if (data) {
            setMyTickets(data);
        }
    }, []);
    
    useEffect(() => {
        getData();
    }, []);


    const filteredTickets = showUpcoming
        ? myTickets.filter((item) => new Date(Number(item.gameStartTime) * 1000) > new Date())
        : myTickets;

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
                    {filteredTickets.length == 0 ? 

                        <div>티켓 정보가 없어요</div>
                    
                : filteredTickets.map((ticket) => (
                    <TicketItem key={ticket.tokenId} ticket={ticket} getData={getData} />
                ))
            
                }
                
                {}
                </div>
            </div>
        </>
    )
}
export default TicketList;