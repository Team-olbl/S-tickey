import React, { useState } from 'react';

interface IBottomSheetProps {
  height: string;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

const BottomModal = ({ height, title, onClose, children }: IBottomSheetProps) => {
  const [isRendering, setIsRendering] = useState<boolean>(true);

  const handleOverlayClick = () => {
    setIsRendering(false);
    setTimeout(() => {
      onClose();
    });
  };

  const getBackgroundColor = (title: string) => {
    switch (title) {
      case '선호 구단':
        return 'bg-[#2E2E3D] text-[16px]';
      default:
        return 'bg-white';
    }
  };

  return (
    <>
      {isRendering && (
        <div className={`fixed top-0 w-full h-screen max-w-[500px] bottom-0 bg-black/50`} onClick={handleOverlayClick}>
          <div
            className={`max-w-[500px] w-full m-auto fixed pb-16 bottom-0 left-0 right-0 rounded-xl ${getBackgroundColor(
              title,
            )} `}
            onClick={e => e.stopPropagation()}
          >
            <div style={{ height: height }}>
              <div className="w-full h-14 grid grid-cols-6 place-items-center">
                <div className="col-span-1">&nbsp;</div>
                <div className="col-span-4 text-sm">{title}</div>
              </div>
              <div className={`overflow-y-scroll h-[calc(100%-56px)]`}>{children}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BottomModal;
