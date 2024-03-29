import Modal from "../@common/Modal";
import Preferred from '../../assets/image/Preferred.png'

const ProfileEditModal = ({ onClose, handleConfirmEdit }: { onClose: () => void; handleConfirmEdit: () => void; }) => {
  return (
    <Modal width="300px" height="auto" title="정보 수정 확인" onClose={onClose}>
      <div className="flex flex-col items-center px-4 pb-6">
        <div>
            <img className='w-16' src={Preferred} alt="선호도" />
        </div>
        <div className='py-2'>
            <p className="text-[14px]">수정하시겠습니까?</p>
        </div>
        <div className="flex justify-center space-x-2 pt-4">
            <button type="button" className="bg-[#5959E7] w-20 text-white px-4 py-1 rounded-lg text-xs" onClick={handleConfirmEdit}>예</button>
            <button type="button" className="bg-gray-500 w-20 text-white px-4 py-1 rounded-lg text-xs" onClick={onClose}>아니오</button>
        </div>
      </div>
    </Modal>
  )
}

export default ProfileEditModal;