import Modal from "../@common/Modal";
import Preferred from "../../assets/image/Preferred.png"
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { buyBackground, buyFilter, getReword } from "../../service/web3/api";
import { ITicket } from "./TicketList";

const BuyingModal = ({ onClose, item, ticket, setTicket }: { onClose: () => void; item : {isFilter : boolean, id : number, price : number}, ticket : ITicket, setTicket: Dispatch<SetStateAction<ITicket>>}) => {
  const [reword, setReword] = useState(0);

  useEffect(() => {
    (async () => {
      const data = await getReword();
      setReword(data / 10e12);
    })();
  }, [])

  const handleBuy = () => {

    (async () => {
      let tx;
      if (item.isFilter) {
        tx = await buyFilter(ticket.tokenId, item.id);
        if (tx) {
          setTicket((state) => ({
            ...state,
            filterId: item.id
          }))
          onClose();
        }
      }
      else {
        tx = await buyBackground(ticket.tokenId, item.id);
        if (tx) {
          setTicket((state) => ({
            ...state,
            backgroundId: item.id
          }))
          onClose();
        }
      }
    })();
  }


  return (
    <Modal width="300px" height="auto" title="" onClose={onClose}>
      <div className="flex flex-col items-center px-4 pb-6">
        <div className=''>
          <img className='w-16' src={Preferred} />
        </div>
        <div className='py-2'>
          <p className="text-xs">아이템을 구매하시겠습니까?</p>
        </div>
        <div className='flex flex-col py-2 justify-center items-center'>
          <div>아이템 가격 : {item.price}</div>
          <div className={`text-xl ${reword < item.price && `text-red-400`}`}>거래 후 꿈 잔액 : {reword - item.price}</div>
        </div>
        <div className="flex justify-center space-x-2 pt-4">
          <button className={`${reword >= item.price ? `bg-[#5959E7]` : `bg-gray-500`} w-20 text-white px-4 py-1 rounded-lg text-xs`} onClick={handleBuy}
          disabled={reword < item.price}>예</button>
            <button className="bg-gray-500 w-20 text-white px-4 py-1 rounded-lg text-xs" onClick={onClose}>아니오</button>
        </div>
      </div>
    </Modal>
  )
}

export default BuyingModal;