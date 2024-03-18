import Modal from '../@common/Modal'
import Dove from '../../assets/Sponsor/Dove.png'

const SponsorModal = ({ onClose }: { onClose: () => void; }) => {
    
    return (
        <Modal width="300px" height="auto" title="후원하기" onClose={onClose}>
            <div className="text-center px-4 pb-6">
                <div className='flex justify-center py-2'>
                    <img className='h-8 pr-2' src={Dove} />
                    <input className='w-40 p-1 border rounded-md text-[8px] outline-none' placeholder='후원 금액을 입력해주세요' />
                </div>
                <div className='py-2'>
                <p className="text-[8px]">
                소중한 후원금은 S:tickey를 통해 후원 단체로 전달되며
                </p>
                <p className="text-[8px]">자세한 후원금 사용 내역은 후원 단체 정보에서 확인하실 수 있습니다</p>
                </div>
                <div className="flex justify-center space-x-2 pt-4">
                    <button className="bg-[#5959E7] text-white px-4 py-1 rounded-lg text-xs" >후원</button>
                    <button className="bg-gray-500 text-white px-4 py-1 rounded-lg text-xs" onClick={onClose}>취소</button>
                </div>
            </div>
        </Modal>
    )
    
}


export default SponsorModal