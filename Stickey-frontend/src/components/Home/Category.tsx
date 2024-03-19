import { useNavigate } from "react-router-dom";


const Category = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-[88px] bg-Stickey_BGC text-white flex justify-center items-center border-b-[0.5px] border-white mt-[10px]">
      <div className="flex items-center gap-[60px]">
        <div className="text-center" onClick={() => navigate(`/soccer`)}>
          <button className="w-[50px] h-[55px] scale-[1.7]">
            <img src='src/assets/Category/soccerball.png' alt="soccer" />
          </button>
          <p className="text-[10px]">축구</p>
        </div>
        <div className="text-center" onClick={() => navigate(`/baseball`)}>
          <button className="w-[52px] h-[56px]">
            <img src='src/assets/Category/baseball.png' alt="baseball" />
          </button>
          <p className="text-[10px]">야구</p>
        </div>
        <div className="text-center" onClick={() => navigate(`/basketball`)}>
          <button className="w-[52px] h-[56px]">
            <img src='src/assets/Category/basketball.png' alt="basketball" />
          </button>
          <p className="text-[10px]">농구</p>
        </div>
      </div>
    </div>
  );
};

export default Category;
