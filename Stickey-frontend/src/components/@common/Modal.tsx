import { useState, useRef } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

interface IModalProps {
  width: string;
  height: string;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ width, height, title, onClose, children }: IModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isRendering, setIsRendering] = useState<boolean>(true);

  const handleClose = () => {
    setIsRendering(false);
    setTimeout(() => {
      onClose();
    });
  };

  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === modalRef.current) {
      handleClose();
    }
  };
               
  return (
    <div
      className={`fixed top-0 w-[500px] bottom-0 ${isRendering ? 'bg-black/50' : 'bg-black/0'}`}
    >
      {/* modal wrapper */}
      <div
        ref={modalRef}
        className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white`}
        onClick={handleModalClick}
      >
        {/* modal */}
        <div
          style={{ width: width, height: height }}
        >
          <div className="w-full h-8 grid grid-cols-6 place-items-center pt-4">
            <div className="col-span-1">&nbsp;</div>
            <div className="col-span-4">{title}</div>
            <div className="col-span-1 w-5 h-5 cursor-pointer" onClick={handleClose}>
              <AiOutlineClose />
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
