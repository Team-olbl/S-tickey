const GameSchedule = () => {
  return (
    <div className="w-full min-h-[232px] p-[12px]">
      <div className="flex flex-row items-center mb-[10px]">
        <img src="src/assets/Logos/대구FC.png" alt="..." className="w-[28px] h-[28px]"/>
        <img src="src/assets/Logos/서울FC.png" alt="..." className="w-[28px] h-[28px]"/>
        <p className="text-white text-[15px]">경기정보 한눈에 보기</p>
      </div>
      <div className="flex flex-col items-center justify-center gap-[8px]">
        <div className="w-[332px] h-[52px] flex flex-row items-center justify-center bg-[#2E2E3D] rounded-[10px] drop-shadow-[2px_2px_rgba(0,0,0,0.25)]">
          <div className="flex flex-row items-center gap-[8px]">
            <div className="flex flex-row">
              <p className="text-white text-[12px]">03.17</p>
              <p className="text-[#FF0000] text-[12px]">일</p>
            </div>
            <p className="text-[16px] text-white font-bold">20:30</p>
            <div className="flex flex-row items-center gap-[8px]">
              <div className="flex flex-row items-center gap-[2px]">
                <img src="src/assets/Logos/대구FC.png" alt="" className="w-[40px] h-[40px]"/>
                <p className="text-[13px] text-white">대구</p>
              </div>
              <p className="text-[20px] text-[#FF0000] font-bold">VS</p>
              <div className="flex flex-row items-center gap-[2px]">
                <img src="src/assets/Logos/광주FC.png" alt="..." className="w-[40px] h-[40px]" />
                <p className="text-[13px] text-white">광주</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[332px] h-[52px] flex flex-row items-center justify-center bg-[#2E2E3D] rounded-[10px] drop-shadow-[2px_2px_rgba(0,0,0,0.25)]">
          <div className="flex flex-row items-center gap-[8px]">
            <div className="flex flex-row">
              <p className="text-white text-[12px]">03.17</p>
              <p className="text-[#FF0000] text-[12px]">일</p>
            </div>
            <p className="text-[16px] text-white font-bold">20:30</p>
            <div className="flex flex-row items-center gap-[8px] ml-[0px]">
              <div className="flex flex-row items-center gap-[2px]">
                <img src="src/assets/Logos/대구FC.png" alt="" className="w-[40px] h-[40px]"/>
                <p className="text-[13px] text-white">대구</p>
              </div>
              <p className="text-[20px] text-[#FF0000] font-bold">VS</p>
              <div className="flex flex-row items-center gap-[2px]">
                <img src="src/assets/Logos/광주FC.png" alt="..." className="w-[40px] h-[40px]" />
                <p className="text-[13px] text-white">광주</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[332px] h-[52px] flex flex-row items-center justify-center bg-[#2E2E3D] rounded-[10px] drop-shadow-[2px_2px_rgba(0,0,0,0.25)]">
          <div className="flex flex-row items-center gap-[8px]">
            <div className="flex flex-row">
              <p className="text-white text-[12px]">03.17</p>
              <p className="text-[#FF0000] text-[12px]">일</p>
            </div>
            <p className="text-[16px] text-white font-bold">20:30</p>
            <div className="flex flex-row items-center gap-[8px] ml-[0px]">
              <div className="flex flex-row items-center gap-[2px]">
                <img src="src/assets/Logos/대구FC.png" alt="" className="w-[40px] h-[40px]"/>
                <p className="text-[13px] text-white">대구</p>
              </div>
              <p className="text-[20px] text-[#FF0000] font-bold">VS</p>
              <div className="flex flex-row items-center gap-[2px]">
                <img src="src/assets/Logos/광주FC.png" alt="..." className="w-[40px] h-[40px]" />
                <p className="text-[13px] text-white">광주</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GameSchedule;