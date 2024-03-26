import { useNavigate } from "react-router-dom";
import Header, { IHeaderInfo } from "../../../components/@common/Header";
import Back from '../../../assets/image/Back.png';
import Bell from '../../../assets/image/Bell.png';
import NavigationBar from "../../../components/@common/NavigationBar";
import SponItem from "../../../components/Profile/Group/SponItem";

export type SponData = {
  id: number;
  title: string;
  start_date: string;
  end_date: string;
  content: string;
  support_img: JSX.Element;
  organization_profile: JSX.Element;
}

const SponListPage = () => {
  const navigate = useNavigate();

  const gotoCreatePage = () => {
    navigate('/sponsor/create');
  };

  const info : IHeaderInfo = {
    left_1: null,
    left_2: <img src={Back} />,
    center: '후원 글 목록',
    right: <img src={Bell} />
  }

  const dummies: SponData[] = [
    {
      id: 1,
      title: 'D211 팀원들에게 사랑을 주세요',
      start_date: "2024-03-00",
      end_date: "2024-03-15",
      content: '후원받은 금액으로 맛있는 간식을 먹을 예정입니다.',
      support_img: <img src="" />,
      organization_profile: <img src="" />
    },
    {
      id: 2,
      title: 'D211 팀원들에게 사랑을 주세요',
      start_date: "2024-03-16",
      end_date: "2024-03-31",
      content: '후원받은 금액으로 맛있는 간식을 먹을 예정입니다.',
      support_img: <img src="" />,
      organization_profile: <img src="" />
    },
  ];

  return(
    <>
      <Header info={info}/>
      <div className="pt-12">
        {/* 단체 회원일 경우에만 보이도록 로직 추가해야함 */}
        {dummies.map((item) => (
          <SponItem  key={item.id} data={item} />
        ))}
        <div className="fixed bottom-16 w-full max-w-[500px] px-4 flex justify-end">
            <button className="flex justify-center text-4xl text-white bg-Stickey_Main w-12 h-12 rounded-full" onClick={() => gotoCreatePage()}>
            +</button>
        </div>
      </div>
      <NavigationBar />

    </>
  )
}

export default SponListPage;