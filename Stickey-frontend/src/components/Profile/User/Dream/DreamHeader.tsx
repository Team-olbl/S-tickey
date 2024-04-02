const DreamHeader = () => {
  return (
    <>
      <div className="flex flex-row justify-center w-full h-[48px] gap-5 ">
        <div className="relative flex items-center gap-2">
          <div>
            <div className="relative w-[20px] border-b border-[#8989FF] "></div>
            <div className="absolute w-[8px] h-[8px] rounded-full bg-[#8989FF] left-[6px] top-1/2 transform -translate-y-1/2"></div>
          </div>
          <div className="text-white text-[12px]">
            <p>증가</p>
          </div>
        </div>
        <div className="relative h-[48px] flex items-center gap-2">
          <div>
            <div className="relative w-[20px] border-b border-[#2F9E65]"></div>
            <div className="absolute w-[8px] h-[8px] rounded-full bg-[#2F9E65] left-[6px] top-1/2 transform -translate-y-1/2"></div>
          </div>
          <div className="text-white text-[12px]">
            <p>감소</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default DreamHeader;
