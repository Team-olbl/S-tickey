import { useNavigate } from "react-router";
import Heart from '../../../assets/image/PurpleHeart.png'
import { useSponsor } from "../../../hooks/Sponsor/useSponsor";
import dayjs from "dayjs";

const SponItem = () => {
  const navigate = useNavigate();


  // TODO 유저 완성 후 실제 api 데이터로 수정해야함
  const { useGetMySponsorList } = useSponsor();
  const { data: mySponsorListInfo } = useGetMySponsorList();
  

  return (
    <div>
      {mySponsorListInfo && mySponsorListInfo.mySupportResList.length > 0 ? (
        mySponsorListInfo?.mySupportResList.map((data, id) => (
          <div key={id}>
          <div className="w-full flex flex-row" onClick={() => navigate(`/sponsor/${data.id}`)}>
          <div className="w-full h-auto flex border-b-[0.5px] border-Stickey_Gray px-4 py-4 gap-3 items-start justify-between">
                <div className="w-16 h-16 border-none rounded bg-Stickey_Gray">
                  <img src={data.supportImage} alt="" />
            </div>
            <div className="text-white grow">
              <div>
                <p className="text-[12px]">{data.title}</p>
              </div>
              <div>
                    <p className="text-[10px]">{dayjs(data.startTime).format('YYYY년 MM월 DD일 HH:mm')}</p>
                <p className="text-[10px]"> ~ </p>
                <p className="text-[10px]">{dayjs(data.endTime).format('YYYY년 MM월 DD일 HH:mm')}</p>
              </div>
            </div>
            <div className={`w-10 h-4 border border-none  flex items-center justify-center rounded-full ${data.status === "ACCEPTED" ?  `${dayjs(data.endTime) > dayjs() ? `bg-green-500` : `bg-blue-500`}` : data.status==="REJECTED" ? 'bg-red-500' : 'bg-Stickey_Gray'} `}>
              <p className="text-[8px] text-white">{data.status === "ACCEPTED" ? `${dayjs(data.endTime) > dayjs() ? `진행 중` : `마감`}` : data.status==="REJECTED" ? '거절됨' : '대기 중'}</p>
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
