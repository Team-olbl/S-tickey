import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Line from '../../assets/image/Line.png';
import Soccer from '../../assets/image/Category/soccerball.png'
import BaseBall from '../../assets/image/Category/baseball.png'
import BasketBall from '../../assets/image/Category/basketball.png'

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const BottomSheet: React.FC<Props> = ({ isOpen, onClose }) => {
  const isRendering = useState<boolean>(true);
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <>
      <div className={`fixed top-0 left-0 w-full max-w-[500px] z-[1] bottom-0 ${isRendering ? 'bg-black/50' : 'bg-black/0'}`} onClick={onClose} >
      <div className="fixed max-w-[500px] w-full bottom-12 max-h-52 bg-white p-4 rounded-t-[20px] z-[3]">
        <div className="flex flex-col items-center">
          <div>
            <img src={Line} className="w-9" />
          </div>
          <div className="flex justify-center p-4">
            <p className="text-[16px] font-bold">종목 선택하기</p>
          </div>
          <div className="flex flex-row justify-center gap-4 ">
            <div className="flex flex-col items-center justify-center w-[88px] h-[100px] border border-Stickey_Gray rounded-[5px] gap-1 cursor-pointer" onClick={() => navigate("/soccer")} >
              <img src={Soccer} className="w-[50px] scale-[1.6]" />
              <p className="text-[10px]">축구</p>
            </div>
            <div
              className="flex flex-col items-center justify-center w-[88px] h-[100px] border border-Stickey_Gray rounded-[5px] gap-1 cursor-pointer"
              onClick={() => navigate("/baseball")}
            >
              <img src={BaseBall} className="w-[50px]" />
              <p className="text-[10px]">야구</p>
            </div>
            <div
              className="flex flex-col items-center justify-center w-[88px] h-[100px] border border-Stickey_Gray rounded-[5px] gap-1 cursor-pointer"
              onClick={() => navigate("/basketball")}
            >
              <img src={BasketBall} className="w-[50px]" />
              <p className="text-[10px]">농구</p>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default BottomSheet;
