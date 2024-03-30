import Modal from '../@common/Modal';
import Waitting from '../../assets/image/Waitting.png';
import { useEffect, useRef, useState } from 'react';
import { useTicketInfoStore } from '../../stores/useTicketInfoStore';
import { Client } from '@stomp/stompjs';
import userStore from '../../stores/userStore';
import { useNavigate } from 'react-router';
import Loading from '../../assets/image/Loading.gif'

const WaittingModal = ({ onClose }: { onClose: () => void; }) => {
    const ticketInfo = useTicketInfoStore((state) => state.modalData);
    const { id: userId } = userStore();
    const [client, setClient] = useState<Client | null>(null);
    const parsedMessageRef = useRef<number>(0);
    const navigate = useNavigate()


    useEffect(() => {
        const newClient = new Client();
        newClient.configure({
            brokerURL: `${import.meta.env.VITE_WEBSOCKET_URL}`,
            onConnect: () => {
                newClient.subscribe(
                    `/sub/id/${userId}`,
                    message => {
                        const parsedMessage = JSON.parse(message.body);
                        console.log(parsedMessage.myTurn);
                        console.log(parsedMessage.rank);
                        console.log(parsedMessage.key);

                        if (parsedMessage.myTurn && parsedMessage.rank === 0) {
                            onClose(); 
                            if (client) {
                                client.publish({
                                    destination: '/games/wait/cancel',
                                    body: undefined,
                                });
                                console.log('취소 메시지 전송')  
                                client.deactivate();                          }
                            navigate(`/${ticketInfo?.id}/section`); 
                        }
                    },
                );

                // '/games/wait/enter' 
                const message = {
                    gameId: ticketInfo?.id,
                    id: userId
                };
                newClient.publish({
                    destination: '/games/wait/enter',
                    body: JSON.stringify(message),
                });

                console.log('웹소켓 연결 확인');
            },
            onDisconnect: () => {
                console.log('웹소켓 연결 종료');
            },
        });

        newClient.activate();
        setClient(newClient);

        return () => {
            newClient.deactivate();
        };
    }, [ticketInfo, userId]);

    useEffect(() => {
        const handleUnload = () => {
            if (client) {
                client.publish({
                    destination: '/games/wait/cancel',
                    body: undefined,
                });
                console.log('취소 메시지 전송');
                client.deactivate();
            }
        };
    
        window.addEventListener('beforeunload', handleUnload);
    
        return () => {
            window.removeEventListener('beforeunload', handleUnload);
            handleUnload();
        };
    }, [client]);
    

    return (
        <Modal width="300px" height="auto" title="" onClose={onClose}>
            <div className="flex flex-col items-center px-4 pb-6 z-[10]">
                <div className='flex flex-col items-center'>
                    <img className='h-12' src={Waitting} alt="Waitting" />
                    <p className='text-sm pt-2'>나의 대기</p>
                    <h1 className='text-4xl font-bold'>{parsedMessageRef?.current}</h1>
                </div>

                <div >
                    <img className='w-16' src={Loading} />
                </div>
        
                <div className='flex flex-col px-4'>
                    <div className='text-[10px] text-center'>
                        <p>현재 접속 인원이 많아 대기중입니다.</p>
                        <p>잠시만 기다려주시면 예매 페이지로 연결됩니다.</p>
                    </div>
                    <div className='text-[12px] font-semibold text-center py-2'>
                        <p>새로고침 하거나 재접속 히시면</p>
                        <p>대기순서가 초기화됩니다.</p>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default WaittingModal;
