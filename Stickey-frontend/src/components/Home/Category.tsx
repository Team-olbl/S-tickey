import { useNavigate } from 'react-router-dom';
import soccer from '../../assets/image/Category/soccerball.png';
import baseball from '../../assets/image/Category/baseball.png';
import basketball from '../../assets/image/Category/basketball.png';

const Category = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-[88px] bg-Stickey_BGC text-white flex justify-center items-center border-b-[0.5px] border-white mt-[10px]">
      <div className="flex items-center gap-[60px]">
        <div className="text-center" onClick={() => navigate(`/soccer`)}>
          <button className="w-[50px] h-[55px] scale-[1.7]">
            <img src={soccer} alt="soccer" />
          </button>
          <p className="text-sm">축구</p>
        </div>
        <div className="text-center" onClick={() => navigate(`/baseball`)}>
          <button className="w-[52px] h-[56px]">
            <img src={baseball} alt="baseball" />
          </button>
          <p className="text-sm">야구</p>
        </div>
        <div className="text-center" onClick={() => navigate(`/basketball`)}>
          <button className="w-[52px] h-[56px]">
            <img src={basketball} alt="basketball" />
          </button>
          <p className="text-sm">농구</p>
        </div>
      </div>
    </div>
  );
};

export default Category;
