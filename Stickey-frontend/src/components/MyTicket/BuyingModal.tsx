import Modal from "../@common/Modal";
import Preferred from "../../assets/image/Preferred.png"

const BuyingModal = ({onClose} : {onClose: () => void;}) => {
  return (
    <Modal width="300px" height="auto" title="" onClose={onClose}>
      <div className="flex flex-col items-center px-4 pb-6">
        <div className=''>
          <img className='w-16' src={Preferred} />
        </div>
        <div className='py-2'>
          <p className="text-xs">아이템을 구매하시겠습니까?</p>
        </div>
        <div className="flex justify-center space-x-2 pt-4">
            <button className="bg-[#5959E7] w-20 text-white px-4 py-1 rounded-lg text-xs" >예</button>
            <button className="bg-gray-500 w-20 text-white px-4 py-1 rounded-lg text-xs" onClick={onClose}>아니오</button>
        </div>
      </div>
    </Modal>
  )
}

export default BuyingModal;