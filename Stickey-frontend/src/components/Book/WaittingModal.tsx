import Modal from '../@common/Modal';
import Waitting from '../../assets/image/Waitting.png';
import { useEffect, useState } from 'react';
import { useTicketInfoStore } from '../../stores/useTicketInfoStore';
import { Client } from '@stomp/stompjs';
import userStore from '../../stores/userStore';

const WaittingModal = ({ onClose }: { onClose: () => void; }) => {
    const ticketInfo = useTicketInfoStore((state) => state.modalData);
    const { id: userId } = userStore();
    const [waitNumbers, setWaitNumbers] = useState<number[]>([]);
    const [currentNumberIndex, setCurrentNumberIndex] = useState(0);
    const [client, setClient] = useState<Client | null>(null);

    console.log(setWaitNumbers, setCurrentNumberIndex, client)

    useEffect(() => {
    
        const newClient = new Client({
          brokerURL: 'ws://j10d211.p.ssafy.io:9091/api/reserve',
        //   connectHeaders: {
        //     Authorization: `Bearer ${accessToken}`,
        //   },
          beforeConnect: () => {
            console.log("Connecting to WebSocket");
          },
          onConnect: () => {
            console.log("Connected to WebSocket");
          },
          onDisconnect: () => {
            console.log("Disconnected from WebSocket");
          },
          onWebSocketClose: (closeEvent) => {
            console.log("WebSocket closed", closeEvent);
          },
          onWebSocketError: (error) => {
            console.log("WebSocket error: ", error);
          },
          heartbeatIncoming: 0,
          heartbeatOutgoing: 0,
        });
    
        setClient(newClient);
        newClient.activate();
      }, []);

    useEffect(() => {
        const newClient = new Client();
        newClient.configure({
            brokerURL: 'ws://j10d211.p.ssafy.io:9091/api/reserve',
            onConnect: () => {
                newClient.subscribe(
                    `/sub/id/${userId}`,
                    message => {
                        const parsedMessage = JSON.parse(message.body);
                        console.log(parsedMessage);
                    },
                );
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


    return (
        <Modal width="300px" height="auto" title="" onClose={onClose}>
            <div className="flex flex-col items-center px-4 pb-6 z-[10]">
                <div className='flex flex-col items-center pb-2'>
                    <img className='h-20' src={Waitting} alt="Waitting" />
                    <p className='text-sm py-2'>나의 대기</p>
                    <h1 className='text-4xl font-bold'>{waitNumbers[currentNumberIndex]}</h1>
                </div>

                <div className="pt-1 py-4 relative">
                    <div className="w-48 h-2 rounded-xl"></div>
                    <div className="absolute top-0 left-0 h-2 bg-Stickey_Main rounded-xl" style={{ width: `${(currentNumberIndex + 1) * (100 / waitNumbers.length)}%` }}></div>
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
