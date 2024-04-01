import X from '../../assets/image/XCircle.png'
import Edit from '../../assets/image/Edit.png'
import { useNavigate } from "react-router-dom";
import { refundTicket, toEther } from "../../service/web3/api";
import dayjs from "dayjs";
import { ITicket } from './TicketList';
import { registSeats } from "../../service/Book/api";
import { toast } from "react-toastify";
import { useCallback, useState } from 'react';
import userStore from '../../stores/userStore';
import GetTime from './GetTime';
import Warning from '../../assets/image/Warning.png'
import { useAnimate } from "framer-motion";


interface TicketOpenModalProps {
    ticket: ITicket; 
    onClose: () => void;
}

const TicketOpenModal: React.FC<TicketOpenModalProps> = ({ ticket, onClose }) => {
    const [isQR, setIsQR] = useState(false);
    const [qr, setQr] = useState("");
    const [onLoad, setOnLoad] = useState(false);
    const navigate = useNavigate();
    const { phone } = userStore();
    const [scope, animate] = useAnimate();

    const handleEditClick = () => {
        navigate(`/mytickets/${ticket.tokenId}/edit`, { state: { ticket } });
    };

    const handleRefund = () => {
        if (refundEnd <= dayjs()) {
            toast.warn("환불 가능 시간대가 아닙니다.");
            return;
        }

        const cancleTicket = async () => {
            const tx = await refundTicket(ticket.tokenId);
            if (tx) {
                const res = await registSeats({ gameId: Number(ticket.gameId), zoneId: Number(ticket.zoneId), seatNumbers: [Number(ticket.seatNumber)], isRefund: true });
                
                if (res.status == 200) {
                    toast.success("환불되었습니다.");
                    onClose();
                    return;
                }
            }
            toast.warn("오류가 발생했습니다.");
        }

        cancleTicket();
    }
    
    const refundEnd = dayjs((Number(ticket.gameStartTime)) * 1000).subtract(1);

    const createQR = useCallback(async () => {
        if (!isQR) {
            const QRData = {
                    tokenId: ticket.tokenId,
                    Match: ticket.homeTeam + " VS " + ticket.awayTeam,
                    date: dayjs(Number(ticket.gameStartTime) * 1000).format("YYYY년 MM월 DD일 HH시 mm분"),
                    seatInfo: ticket.zoneName + " " + ticket.seatNumber + "번 좌석",
                    price: ticket.price,
                    enable: dayjs().add(15, 'second'),
                    phone
                }
                setQr(`https://api.qrserver.com/v1/create-qr-code/?size=300x250&data=${JSON.stringify(QRData)}`);
        }
    },[])


    const handleQR = () => {
        animate("div", { rotateY: [180, 0]}, { duration: 0.6 })

        setIsQR(!isQR);
        if (isQR) {
            setOnLoad(false);
        } 
        createQR();
    }


    return (
        <div className="fixed top-0 w-[500px] bottom-0 bg-black/80 overflow-hidden">
            {/* modal wrapper */}
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg"  ref={scope}>
            {onLoad &&
                    <div className='flex justify-center mb-2 items-center fixed left-0 right-0'
                        style={{ transform : "translateY(-110%)" }}>
                    <img src={Warning} alt="" className="w-8"/>
                    <div>
                        <p className='ml-2 text-sm text-white h-full '>캡처한 이미지로는 입장이 불가능합니다.</p>
                    </div>
                </div>}
                {/* modal */}
                <div className="h-auto flex flex-col text-center items-center">
                    <div className="w-[300px] bg-white rounded-b-lg p-2 font-semibold">
                        <p>{ticket.homeTeam} vs {ticket.awayTeam}</p>
                    </div>
                    <div className="bg-white rounded-2xl" >
                    <div className='flex ml-2'>
                        

                        </div>
                        {!isQR ? <>
                            <img className="w-[300px] rounded-3xl p-4" src={ticket.gameImage} />
                            <div className="absolute bottom-64 right-6">
                                <img onClick={handleEditClick} className="bg-white/50 rounded-full p-2" src={Edit} />
                            </div> 
                            </>
                            :
                            <>
                                <img className="w-[300px] rounded-3xl p-4" src={qr} onLoad={() => setOnLoad(true)} />
                            {onLoad && <GetTime createQR={createQR}></GetTime>}
                            </>
                        }
                    </div>
                    <div className="bg-white rounded-t-lg w-[300px] text-center py-2">
                        <p>2024년 04월 02일 {ticket.stadium}</p>
                        <p className="font-bold text-2xl">{ticket.zoneName} {ticket.seatNumber}번 좌석</p>
                        <p>결제금액 : {toEther(ticket.price)} ETH</p>
                        <div className="px-4 py-3 flex justify-center">
                            <button className="bg-gray-400 w-1/2 mx-1 p-2 rounded-md text-white font-bold"  onClick={handleQR}>QR전환</button>
                            <button onClick={handleRefund} className="bg-gray-400 w-1/2 mx-1 p-2 rounded-md text-white font-bold">환불하기</button>
                        </div>
                    </div>

                    <div id="x" onClick={onClose} className="mt-6 flex justify-center items-center h-12 w-12 bg-white rounded-full">
                        <img className="w-12 h-12" src={X} />
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default TicketOpenModal;
