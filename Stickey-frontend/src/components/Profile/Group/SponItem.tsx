import { useNavigate } from "react-router";
import Heart from '../../../assets/image/PurpleHeart.png'
import { useSponsor } from "../../../hooks/Sponsor/useSponsor";
import dayjs from "dayjs";

const SponItem = () => {
  const navigate = useNavigate();
  const { useGetMySponsorList } = useSponsor();
  const { data: mySponsorListInfo } = useGetMySponsorList();
  

  return (
    <div>
      {mySponsorListInfo && mySponsorListInfo.mySupportResList.length > 0 ? (
        mySponsorListInfo?.mySupportResList.map((data, id) => (
          <div key={id}>
          <div onClick={() => navigate(`/sponsor/${data.id}`)}>
          <div className="h-auto flex border-b-[0.5px] border-Stickey_Gray p-4 gap-3">
              <div className="w-16 h-16 rounded-md bg-Stickey_Gray">
              <img className="w-16 h-16 rounded-md" src={data.supportImage}  />
            </div>
            <div className="text-white grow px-2">
              <div>
                <div className={`w-10 h-4 flex justify-center items-center rounded-full ${data.status === "ACCEPTED" ?  `${dayjs(data.endTime) > dayjs() ? `bg-green-500` : `bg-blue-500`}` : data.status==="REJECTED" ? 'bg-red-500' : 'bg-Stickey_Gray'} `}>
                  <p className="text-[9px]">{data.status === "ACCEPTED" ? `${dayjs(data.endTime) > dayjs() ? `진행 중` : `마감`}` : data.status==="REJECTED" ? '거절됨' : '대기 중'}</p>
                </div>
                <p className="text-md py-1">{data.title}</p>
              </div>
              <div>
                <p className="text-xs">{dayjs(data.startTime).format('YYYY.MM.DD HH:mm')} ~ {dayjs(data.endTime).format('YYYY.MM.DD HH:mm')}</p>
              </div>
            </div>
          </div>
        </div>
        </div>
        ))
      ) : (
        <div className="flex flex-col items-center pt-40">
          <img className="w-32" src={Heart} />
          <div className="text-white text-center text-sm py-4">
            <p className="py-4">인증 완료된 후원글이 없어요 !</p>
          </div>
        </div>
      )}

    </div>
  );
};

export default SponItem;
