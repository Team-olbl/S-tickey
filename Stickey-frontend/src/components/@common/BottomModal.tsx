import { useState } from 'react';

interface IBottomSheetProps {
  height: string;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

const BottomModal = ({ height, title, onClose, children }: IBottomSheetProps) => {
  const [isRendering, setIsRendering] = useState<boolean>(true);

  const handleClose = () => {
    setIsRendering(false);
    setTimeout(() => {
      onClose();
    });
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full max-w-[500px] z-[1] bottom-0 ${isRendering ? 'bg-black/50' : 'bg-black/0'}`}
      onClick={handleClose}
    >
      {/* bottom wrapper */}
      <div
        className={`max-w-[500px] m-auto fixed pb-16 bottom-0 left-0 right-0 rounded-xl bg-white`}
      >
        {/* bottom sheet */}
        <div
          style={{ height: height }}
          onClick={e => {
            e.stopPropagation();
          }}
        >
          <div className="w-full h-14 grid grid-cols-6 place-items-center">
            <div className="col-span-1">&nbsp;</div>
            <div className="col-span-4 text-sm">{title}</div>
          </div>
          <div className={`overflow-y-scroll h-[calc(100%-56px)]`}>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default BottomModal;