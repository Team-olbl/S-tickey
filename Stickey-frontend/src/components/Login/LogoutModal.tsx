import Modal from '../@common/Modal'
import Bye from '../../assets/image/Bye.png'

const LogoutModal = ({ onClose }: { onClose: () => void; }) => {

    // 로그아웃 로직 추가하기
    
    return (
        <Modal width="300px" height="auto" title="로그아웃" onClose={onClose}>
            <div className="flex flex-col items-center px-4 pb-6">
                <div className=''>
                    <img className='h-8 pr-2' src={Bye} />
                </div>
                <div className='py-2'>
                <p className="text-xs">
                로그아웃 하시겠습니까 ?
                </p>
                </div>
                <div className="flex justify-center space-x-2 pt-4">
                    <button className="bg-[#5959E7] w-20 text-white px-4 py-1 rounded-lg text-xs" >로그아웃</button>
                    <button className="bg-gray-500 w-20 text-white px-4 py-1 rounded-lg text-xs" onClick={onClose}>취소</button>
                </div>
            </div>
        </Modal>
    )
    
}


export default LogoutModal;