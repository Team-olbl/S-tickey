import dayjs from 'dayjs';
import { ISupportSimpleRes } from '../../types/Sponsor';
import { useEffect, useState } from 'react';

const SponsorItem = ({ data }: { data: ISupportSimpleRes }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = new Date(data.startTime).getTime();
    const end = new Date(data.endTime).getTime();
    const now = new Date().getTime();

    const total = end - start;
    const currentProgress = now - start;
    const progressPercentage = (currentProgress / total) * 100;

    // 현재 날짜가 시작일과 종료일 사이인 경우에만 진행도를 업데이트합니다.
    if (now >= start && now <= end) {
      setProgress(progressPercentage);
    } else if (now > end) {
      setProgress(100); // 종료일 이후라면 진행도 100%
    }
    // 시작일 전이라면 진행도를 0%로 설정할 수 있습니다.
  }, [data.startTime, data.endTime]);

  const startTime = dayjs(data.startTime).format('YYYY년 MM월 DD일');
  const endTime = dayjs(data.endTime).format('YYYY년 MM월 DD일');

  return (
    <div className="mb-2 shadow-sm shadow-black rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl rounded-br-2xl">
      <div>
        <img className="bg-gray-300 h-32 rounded-tl-2xl rounded-tr-2xl w-full object-cover" src={data.supportImage} />
      </div>
      <div className="bg-Stickey_Middle px-4 rounded-bl-2xl rounded-br-2xl">
        <div className="flex items-center pt-2">
          <img src={data.profileImage} className="bg-gray-500 w-6 h-6 rounded-full" />
          <p className="text-white text-md pl-2 font-semibold">{data.title}</p>
        </div>
        <div>
          <p className="text-white text-[10px] p-1 text-left">
            {startTime} ~ {endTime}
          </p>
        </div>
        <div className="pt-1 pb-4">
          <div className="w-full h-2 bg-white rounded-xl overflow-hidden">
            <div
              style={{ width: `${progress}%` }}
              className="h-full bg-Stickey_Main rounded-xl transition-width duration-500"
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SponsorItem;
