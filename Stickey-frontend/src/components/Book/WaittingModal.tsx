import Modal from '../@common/Modal';
import Waitting from '../../assets/image/Waitting.png';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useTicketInfoStore } from '../../stores/useTicketInfoStore';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const WaittingModal = ({ onClose }: { onClose: () => void; }) => {
    const navigate = useNavigate();
    const ticketInfo = useTicketInfoStore((state) => state.modalData);

    // 테스트용

    // 조건부 랜덤 숫자 함수
    const getRandomWaitNumbers = () => {
        const waitNumbers = [];
        let num = 28;
        while (num >= 3) {
            waitNumbers.push(num);
            num -= Math.floor(Math.random() * 2) ? 7 : 9;
        }
        return waitNumbers;
    };


    const [waitNumbers, setWaitNumbers] = useState<number[]>(getRandomWaitNumbers());
    const [currentNumberIndex, setCurrentNumberIndex] = useState(0);
    console.log(setWaitNumbers)

    useEffect(() => {
        const gameId = 1; // 게임 ID
        const userId = 1; // 유저 PK

        const connectWebSocket = () => {
            const socket = new SockJS('http://localhost:9091/api/reserve');
            const client = Stomp.over(socket);

            client.connect({}, () => {
                console.log('연결시도?')
                client.subscribe(`/sub/id/${userId}`, (message) => {
                    const waitStateRes = JSON.parse(message.body);

                    // 대기
                    console.log("내 차례인지: " + waitStateRes.myTurn);
                    console.log("대기열 순위: " + waitStateRes.rank);
                    console.log("key: " + waitStateRes.key);
                });

                client.send("/games/wait/enter", {}, JSON.stringify({ "gameId": gameId, "id": userId }));
            });
        };

        connectWebSocket();

        // 테스트용 코드

        const waitNumberInterval = setInterval(() => {
            if (currentNumberIndex === waitNumbers.length - 1) {
                setTimeout(() => {
                    navigate(`/${gameId}/section`);
                }, 1000);
                clearInterval(waitNumberInterval);
            } else {
                setCurrentNumberIndex(prevIndex => prevIndex + 1);
            }
        }, 1000);

        return () => {
            clearInterval(waitNumberInterval);
        };
    }, [onClose, navigate, ticketInfo, waitNumbers, currentNumberIndex]);
    
    return (
        <Modal width="300px" height="auto" title="" onClose={onClose}>
            <div className="flex flex-col items-center px-4 pb-6 z-[10]">
                <div className='flex flex-col items-center pb-2'>
                    <img className='h-20' src={Waitting} />
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
