import SponsorItem from '../../components/Sponsor/SponsorItem';
import Dove from '../../assets/image/Dove.png';
import Bell from '../../assets/image/Bell.png';
import Header, { IHeaderInfo } from '../../components/@common/Header';
import NavigationBar from '../../components/@common/NavigationBar';
import { useNavigate } from 'react-router-dom';
import { useSponsor } from '../../hooks/Sponsor/useSponsor';
import { ISupportSimpleRes } from '../../types/Sponsor';
import React, { useState } from 'react';

export type SponsorItemData = {
  id: number;
  title: string;
  content: string;
  start_date: string;
  end_date: string;
};

const info: IHeaderInfo = {
  left_1: null,
  left_2: null,
  center: '후원',
  right: <img src={Bell} />,
};
const SponsorPage = () => {
  const navigate = useNavigate();

  const { useSupportList } = useSponsor();

  const [flag, setFlag] = useState(0);

  // useSupportList 훅을 사용하여 API 요청을 수행합니다.
  // 필요한 경우, props를 전달하여 API 요청을 커스터마이즈할 수 있습니다.
  // 예제에서는 props를 전달하지 않고 기본 값을 사용하는 것으로 가정합니다.
  const { data: sponsorListInfo } = useSupportList({ flag });

  const gotoSponsorDetail = (id: number) => {
    navigate(`/sponsor/${id}`);
  };

  return (
    <>
      <Header info={info} />
      <div className="pt-16 mb-3">
        <button
          onClick={() => setFlag(0)}
          className={`ml-3  w-24 mr-1.5 border border-white rounded-xl p-1 text-xs ${flag === 0 && 'bg-white text-black'} ${flag === 1 && 'text-white'}`}
        >
          <p>후원 진행중</p>
        </button>
        <button
          onClick={() => setFlag(1)}
          className={`ml-1 w-20 mr-1.5 border border-white rounded-xl p-1 text-xs ${flag === 1 && 'bg-white text-black'} ${flag === 0 && 'text-white'}`}
        >
          <p>후원 마감</p>
        </button>
      </div>
      <div className="">
        {sponsorListInfo?.data.supportListRes.length === 0 ? (
          <div className="flex flex-col items-center mt-40">
            <img src={Dove} className="h-20" />
            <p className=" text-white text-sm mt-4">후원글이 없습니다</p>
          </div>
        ) : (
          sponsorListInfo?.data.supportListRes.map((item: ISupportSimpleRes) => (
            <div className="flex flex-col px-6 py-1" key={item.id}>
              <button onClick={() => gotoSponsorDetail(item.id)}>
                <SponsorItem data={item} />
              </button>
            </div>
          ))
        )}
      </div>
      <NavigationBar />
    </>
  );
};

export default SponsorPage;
