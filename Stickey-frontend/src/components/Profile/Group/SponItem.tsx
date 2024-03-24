import { useNavigate } from "react-router";
import { SponData } from "../../../pages/Profile/Group/SponList/SponListPage";


const SponItem = ({ data }: { data: SponData }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/sponsor/${data.id}`);
  };

  const isExpired = new Date(data.end_date) < new Date();

  return (
    <div className="w-full flex flex-row" onClick={handleClick}>
      <div className="w-full h-auto flex border-b-[0.5px] border-Stickey_Gray px-4 py-4 gap-3 items-start">
        <div className="w-16 h-16 border-none rounded bg-Stickey_Gray">{data.organization_profile}</div>
        <div className="text-white">
          <div>
            <p className="text-[12px]">{data.title}</p>
          </div>
          <div>
            <p className="text-[10px]">{`${data.start_date} ~ ${data.end_date}`}</p>
          </div>
          <div>
            <p className="text-[10px]">{data.content}</p>
          </div>
        </div>
        <div className={`w-10 h-4 border border-none ${isExpired ? 'bg-Stickey_Gray' : 'bg-green-500'} flex items-center justify-center rounded-full`}>
          <p className="text-[8px] text-white">{isExpired ? '종료' : '진행 중'}</p>
        </div>
      </div>
    </div>
  );
};

export default SponItem;
