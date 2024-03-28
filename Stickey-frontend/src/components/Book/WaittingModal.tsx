import Modal from '../@common/Modal'
import Waitting from '../../assets/image/Waitting.png'
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { useTicketInfoStore } from '../../stores/useTicketInfoStore';
import  { CompatClient, Stomp } from '@stomp/stompjs'
import SockJS from 'sockjs-client';

const WaittingModal = ({ onClose }: { onClose: () => void; }) => {

    const navigate = useNavigate(); 
    const ticketInfo = useTicketInfoStore((state) => state.modalData)
    const client = useRef<CompatClient>();

    // 임시 대기열
    useEffect(() => {
        const userId = 1; // 임의 유저
        const gameId = ticketInfo?.id;
    
        const connectWebSocket = () => {
            client.current = Stomp.over(() => {
                const sock = new SockJS(`${import.meta.env.VITE_WEBSOCKET_URL}`);
                console.log("연결시도?")
                console.log(sock)
                return sock;
            });
    
            client.current?.connect({}, () => {
                console.log('WebSocket 연결 성공');
                client.current?.subscribe(
                    `/sub/id/${userId}`,
                    (message) => {
                        const waitStateRes = JSON.parse(message.body);
                        console.log("내 차례인지: " + waitStateRes.myTurn);
                        console.log("대기열 순위: " + waitStateRes.rank);
                        console.log("key: " + waitStateRes.key);
                    }
                );
    
                client.current?.send("/games/wait/enter", {}, JSON.stringify({"gameId": gameId, "id": userId}));
            }, () => {
                console.error('WebSocket 연결 실패');
                setTimeout(connectWebSocket, 5000); // 5초 후에 재시도
            });
        };
    
        connectWebSocket();

        const timeout = setTimeout(() => {
            onClose();
            navigate(`/${gameId}/section`);
        }, 6000); // 6초 후에 모달 닫고 페이지로 이동
    
        return () => {
            if (client.current?.connected) {
                client.current.disconnect();
                console.log('WebSocket 연결 종료');
            }
            clearTimeout(timeout);
        };
    }, [onClose, navigate, ticketInfo]);
    
    return (
        <Modal width="300px" height="auto" title="" onClose={onClose}>
            <div className="flex flex-col items-center px-4 pb-6 z-[10]">
                <div className='flex flex-col items-center pb-2'>
                    <img className='h-20' src={Waitting} />
                    <p className='text-sm py-2'>나의 대기</p>
                    <h1 className='text-4xl font-bold'>3562</h1>
                </div>

                <div className="pt-1 py-4">
                        <div className="w-48 h-2 border bg-Stickey_Main rounded-xl"></div>
                </div>
        
           
                <div className='flex flex-col px-4'>
                    <div className='text-[8px] text-center'>
                        <p>현재 접속 인원이 많아 대기중입니다.</p>
                        <p>잠시만 기다려주시면 예매 페이지로 연결됩니다.</p>
                    </div>
                    <div className='text-[10px] font-semibold text-center py-2'>
                        <p>새로고침 하거나 재접속 히시면</p>
                        <p>대기순서가 초기화됩니다.</p>
                    </div>
                </div>
            </div>
        </Modal>
    )
    
}


export default WaittingModal;
