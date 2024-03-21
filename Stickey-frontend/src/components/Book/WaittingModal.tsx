import Modal from '../@common/Modal'
import Waitting from '../../assets/image/Waitting.png'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';


const WaittingModal = ({ onClose, selectedSeat }: { onClose: () => void; selectedSeat: string; }) => {

    const navigate = useNavigate(); 

    // 임시 대기열
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
            navigate('/book/seat', { state: { selectedSeat } }); // 선택한 좌석과 함께 다음 페이지로 이동
        }, 3000);

        return () => clearTimeout(timer); 
    }, [onClose, navigate, selectedSeat]);

    console.log(selectedSeat)

    
    return (
        <Modal width="300px" height="auto" title="현재 대기순서" onClose={onClose}>
            <div className="flex flex-col items-center px-4 pb-6">
                <div className='flex flex-col items-center pb-2'>
                    <img className='h-20' src={Waitting} />
                    <h1 className='text-4xl font-bold'>3562</h1>
                </div>

                <div className="pt-1 py-4">
                        <div className="w-48 h-2 border bg-Stickey_Main rounded-xl"></div>
                </div>
        
           
                <div className='flex flex-col px-4'>
                    <div className='text-[8px] text-center'>
                        <p>현재 접속 인원이 많아 대기중입니다.</p>
                        <p>잠시만 기다려주시면 다음 단계 페이지로 연결됩니다.</p>
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