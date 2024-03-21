import Header, { IHeaderInfo } from "../../../components/@common/Header";
import NavigationBar from "../../../components/@common/NavigationBar";
import Back from '../../../assets/image/Back.png'
import map from '../../../assets/image/map.png'
import { useState } from "react";
import SponsorModal from "../../../components/Sponsor/SponsorModal";
// import { useParams } from "react-router-dom";

type SupportInfo = {
  id: number;
  title: string;
  content: string;
  start_date: string;
  end_date: string;
};

type OrganizationInfo = {
  id: number;
  email: string;
  name: string;
  phone: string;
  manager: string;
  address: string;
};

type PlayerInfo = {
  id: number;
  name: string;
  profile: string;
  birth: string;
};

export type SponsorDetailData = {
  support_info: SupportInfo;
  organization_info: OrganizationInfo;
  players: PlayerInfo[];
};


const info : IHeaderInfo = {
  left_1:  null,
  left_2: <img src={Back} alt="" />,
  center:'후원',
  right: <img src="src/assets/Alarm/Bell.png" />
}

const SponsorDetailPage = () => {

  // const params = useParams<{ id: string }>();
  // const sponsorId = params.id;

  const [isModalOpen, setIsModalOpen] = useState(false);


  const dummyData: SponsorDetailData = {
    support_info: {
      id: 1,
      title: "D211의 팀원들에게 사랑을 주세요",
      content: "후원받은 금액으로 맛있는 간식을 먹을 예정입니다.",
      start_date: "2024-04-01T23:59:00",
      end_date: "2024-04-15T23:59:00",
    },
    organization_info: {
      id: 1,
      email: "admin@naver.com",
      name: "SSAFY1",
      phone: "053-456-8795",
      manager: "임스티",
      address: "경상북도 구미시 인동 2길",
    },
    players: [
      {
        id: 1,
        name: "황선우",
        profile: "",
        birth: "1998-02-01T00:00:00",
      },
      {
        id: 2,
        name: "손지인",
        profile: "",
        birth: "2006-12-23T00:00:00",
      },
      {
        id: 3,
        name: "박혜정",
        profile: "",
        birth: "2003-03-12T00:00:00",
      },
    ],
  };

  return (
    <>
    <div>
      <Header info={info} />
      <div className="pt-12 pb-32">
        {/* 후원글 정보 */}
        <div className="bg-gray-300 h-60"></div>
        <div className="p-4">
          <p className="font-bold w-24 text-[10px] px-2 py-1 bg-white border rounded-3xl text-center">
            후원마감 D-14
          </p>
          <p className="text-white py-2">{dummyData.support_info.title}</p>
          <div className="w-full h-2 bg-white rounded-xl "></div>
          <p className="text-white text-[10px] text-left py-2">{dummyData.support_info.start_date} ~ {dummyData.support_info.end_date}</p>
          <p className="text-white text-sm">{dummyData.support_info.content}</p>
        </div>

        {/* 단체 정보 */}
        <div className="px-4">
          <div className="flex items-center">
            <p className="bg-gray-500 w-6 h-6 rounded-full"></p>
            <p className="text-white text-sm pl-2">{dummyData.organization_info.name}</p>
          </div>
          <div>
            <p className="text-xs text-white py-2">후원금 사용내역 보기</p>
            <button className="bg-white w-full rounded-md py-2 text-xs">사용내역 보기</button>
          </div>
          <div>
            <p className="text-xs text-white py-2">후원 유망주</p>
            <div className="grid grid-cols-2">
              {/* 후원유망주 목록 */}
              {dummyData.players.map((player) => (
                <div key={player.id} className="p-1" >
                  <div className="bg-[#2E2E3D] flex items-center p-2 rounded-md">
                    <p className="w-12 h-12 rounded-md bg-gray-300"></p>
                    <div className="px-2">
                      <p className="text-white text-xs">{player.name}</p>
                      <p className="text-[8px] text-gray-400">{player.birth}</p>
                    </div>
                    </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 기본 정보 */}
        <div className="px-4">
          <p className="text-xs text-white py-2">기본 정보</p>
          <div className="bg-[#2E2E3D] flex px-4 rounded-md justify-between">
             <div className="text-[10px] py-4 text-white">
                <p>{dummyData.organization_info.name}</p>
                <p>{dummyData.organization_info.phone}</p>
                <p>{dummyData.organization_info.manager} 담당자</p>
                <p>{dummyData.organization_info.address}</p>
                <p>{dummyData.organization_info.email}</p>
              </div>
              <div className="flex items-center">
                <img src={map} className="h-20" />
              </div>
          </div>
        </div>
      </div>
      {/* 후원 버튼 */}
      <div className="fixed bottom-16 w-full max-w-[360px] m-auto px-4">
          <button className="bg-[#5959E7] w-full text-white rounded-xl p-2 text-md" onClick={() => setIsModalOpen(true)}>후원하기</button>
      </div>

      {isModalOpen && <SponsorModal onClose={() => setIsModalOpen(false)} />}
    <NavigationBar />
    </div>
    </>
  )
}

export default SponsorDetailPage;

