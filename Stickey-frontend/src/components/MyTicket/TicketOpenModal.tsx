import { ITicket } from "../../pages/MyTicket/MyTicketPage"; 
import X from '../../assets/image/XCircle.png'
import Edit from '../../assets/image/Edit.png'
import { useNavigate } from "react-router-dom";
import { toEther } from "../../service/web3/api";

interface TicketOpenModalProps {
    ticket: ITicket; 
    onClose: () => void;
}

const TicketOpenModal: React.FC<TicketOpenModalProps> = ({ ticket, onClose }) => {

    const navigate = useNavigate();

    const handleEditClick = () => {
        navigate(`/mytickets/${ticket.tokenId}/edit`, { state: { ticket } });
    };

    const handleRefund = () => {

    }


    return (
        <div className="fixed top-0 w-[500px] bottom-0 bg-black/80 overflow-hidden">

            {/* modal wrapper */}
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg">
                {/* modal */}
                <div className="h-auto flex flex-col text-center items-center">
                    <div className="w-[300px] bg-white rounded-b-lg p-2 font-semibold">
                        <p>{ticket.homeTeam}vs{ticket.awayTeam}</p>
                    </div>
                    <div className="bg-white rounded-2xl">
                    <img className="w-[300px] rounded-3xl p-4" src={ticket.gameImage} />
                    <div className="absolute bottom-64 right-6">
                        <img onClick={handleEditClick} className="bg-white/50 rounded-full p-2" src={Edit} />
                    </div>
                </div>
                    <div className="bg-white rounded-t-lg w-[300px] text-center py-2">
                        <p>2024년 04월 02일 {ticket.stadium}</p>
                        <p className="font-bold text-2xl">{ticket.zoneName} {ticket.seatNumber}번 좌석</p>
                        <p>결제금액 : {toEther(ticket.price)}</p>
                        <div className="px-4 py-3 flex justify-center">
                            <button className="bg-gray-400 w-1/2 mx-1 p-2 rounded-md text-white font-bold">QR보기</button>
                            <button onClick={handleRefund} className="bg-gray-400 w-1/2 mx-1 p-2 rounded-md text-white font-bold">환불하기</button>
                        </div>
                    </div>

                    <div onClick={onClose} className="mt-6 flex justify-center items-center h-12 w-12 bg-white rounded-full">
                        <img className="w-12 h-12" src={X} />
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default TicketOpenModal;
