import { useNavigate } from "react-router";
// import { useSponsor } from "../../../hooks/Sponsor/useSponsor";
import { IMySponsorListRes } from "../../../types/Sponsor";
import Heart from '../../../assets/image/PurpleHeart.png'

const SponItem = () => {
  const navigate = useNavigate();

  // const isExpired = new Date(data) < new Date();

  // TODO 유저 완성 후 실제 api 데이터로 수정해야함
  // const { useGetMySponsorList } = useSponsor();
  // const { data: mySponsorListInfo } = useGetMySponsorList();
  // const mySponsorList = mySponsorListInfo?.data.mySupportResList || [];

  const dummyMySponsorList: IMySponsorListRes = {
    mySupportResList: []
  }
 
  return (
    <div>
      {dummyMySponsorList.mySupportResList.length > 0 ? (
        dummyMySponsorList.mySupportResList.map((data, id) => (
          <div key={id}>
          <div className="w-full flex flex-row" onClick={() => navigate(`/sponsor/${data.id}`)}>
          <div className="w-full h-auto flex border-b-[0.5px] border-Stickey_Gray px-4 py-4 gap-3 items-start justify-center">
            <div className="w-16 h-16 border-none rounded bg-Stickey_Gray">프로필</div>
            <div className="text-white">
              <div>
                <p className="text-[12px]">{data.title}</p>
              </div>
              <div>
                <p className="text-[10px]">{`${data.startTime} ~ ${data.endTime}`}</p>
              </div>
              <div>
                <p className="text-[10px]">{data.content}</p>
              </div>
            </div>
            <div className={`w-10 h-4 border border-none bg-green-500 flex items-center justify-center rounded-full`}>
              <p className="text-[8px] text-white">진행중</p>
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
