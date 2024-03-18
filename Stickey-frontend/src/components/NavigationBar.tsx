const NavigationBar = () => {
  return (
      <div className="w-full h-[52px] border-t-[0.5px] border-white flex flex-row justify-center gap-[56px] items-center">
        <div className="flex flex-col items-center gap-0">
          <img src="src/assets/NavigationBar/House.png" alt="..." className="w-[32px] h-[32px]" />
          <p className="text-white text-center text-[8px]">홈</p>
        </div>
        <div className="flex flex-col items-center">
          <img src="src/assets/NavigationBar/Tree.png" alt="..." className="w-[32px] h-[32px]" />
          <p className="text-white text-center text-[8px]">후원</p>
        </div>
        <div className="flex flex-col items-center">
          <img src="src/assets/NavigationBar/Ticket.png" alt="..." className="w-[32px] h-[32px]" />
          <p className="text-white text-center text-[8px]">티켓</p>
        </div>
        <div className="flex flex-col items-center">
          <img src="src/assets/NavigationBar/User.png" alt="..." className="w-[32px] h-[32px]" />
          <p className="text-white text-center text-[8px]">마이</p>
        </div>
      </div>    
  )
}

export default NavigationBar;