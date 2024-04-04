import Modal from '../@common/Modal';
import Crying from '../../assets/image/Crying.png';

const NotSoldModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <Modal width="220px" height="160px" title="" onClose={onClose}>
      <div className="flex flex-col items-center pb-4">
        <img className="w-10" src={Crying} />
        <p className="text-xs pt-2 pb-4">이미 선택된 좌석입니다.</p>
        <button className="w-20 text-xs text-white bg-Stickey_Main rounded-md p-1" onClick={() => onClose()}>
          확인
        </button>
      </div>
    </Modal>
  );
};
export default NotSoldModal;
