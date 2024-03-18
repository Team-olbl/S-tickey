import { useLocation, useNavigate } from "react-router-dom";

const NavigationBar = () => {
  const navigate = useNavigate();
  const {pathname} = useLocation();
  

  const handleTabClick = (tab:any) => {
    switch (tab) {
      case "home":
        navigate('/');
        break;
      case "sponsor":
        navigate('/sponsor');
        break;
      case "mytickets":
        navigate('/mytickets');
        break;
      case "profile":
        navigate('/profile');
        break;
      default:
        navigate('/');
    }
  }

  return (
    <div className="w-[360px] h-[52px] border-t-[0.5px] border-white flex flex-row fixed bottom-0 justify-center gap-[56px] items-center ">
      <div className="flex flex-col items-center gap-0" onClick={() => handleTabClick("home")}>
        <img
          src={pathname === "/" ? "src/assets/NavigationBar/FilledHouse.png" : "src/assets/NavigationBar/House.png"}
          alt="..."
          className="w-[32px] h-[32px]"
        />
        <p className="text-white text-center text-[8px]">홈</p>
      </div>
      <div className="flex flex-col items-center" onClick={() => handleTabClick("sponsor")}>
        <img 
          src={pathname === "/sponsor" ? "src/assets/NavigationBar/FilledTree.png" : "src/assets/NavigationBar/Tree.png"} 
          alt="..." 
          className="w-[32px] h-[32px]"
        />
        <p className="text-white text-center text-[8px]">후원</p>
      </div>
      <div className="flex flex-col items-center" onClick={() => handleTabClick("mytickets")}>
        <img
          src={pathname === "/mytickets" ? "src/assets/NavigationBar/FilledTicket.png" : "src/assets/NavigationBar/Ticket.png"}
          alt="..."
          className="w-[32px] h-[32px]"
        />
        <p className="text-white text-center text-[8px]">티켓</p>
      </div>
      <div className="flex flex-col items-center" onClick={() => handleTabClick("profile")}>
        <img 
          src={pathname === "/profile" ? "src/assets/NavigationBar/FilledUser.png" : "src/assets/NavigationBar/User.png"}
          alt="..." 
          className="w-[32px] h-[32px]"
        />
        <p className="text-white text-center text-[8px]">마이</p>
      </div>
    </div>
  );
};

export default NavigationBar;
