import SponsorItem from "../../components/Sponsor/SponsorItem";
import Dove from '../../assets/image/Dove.png'
import Bell from '../../assets/image/Bell.png'
import Header, { IHeaderInfo } from "../../components/@common/Header";
import NavigationBar from "../../components/@common/NavigationBar";
import { useNavigate } from "react-router-dom";

export type SponsorItemData = {
  id: number;
  title: string;
  content : string;
  start_date: string;
  end_date: string;

}

const info : IHeaderInfo = {
  left_1:  null,
  left_2:  null,
  center:'후원',
  right: <img src={Bell} />
}
const SponsorPage = () => {
  const navigate = useNavigate();

  const dummyList: SponsorItemData[] = [
    {
      id: 1,
      title: '머시기저시기 하반기 청소년 단체 후원',
      content: '내용입니다 내용입니다 내용입니다',
      start_date: '2024.03.01',
      end_date: '2024.03.11',
    },
    {
      id: 2,
      title: '머시기저시기 하반기 청소년 단체 후원',
      content: '내용입니다 내용입니다 내용입니다',
      start_date: '2024.03.01',
      end_date: '2024.03.11',
    },
    {
      id: 3,
      title: '머시기저시기 하반기 청소년 단체 후원',
      content: '내용입니다 내용입니다 내용입니다',
      start_date: '2024.03.01',
      end_date: '2024.03.11',
    },
  ]

  const gotoSponsorDetail = (id: number) => {
    navigate(`/sponsor/${id}`);
  };

  return(
    <>
    <Header info={info} />
      <div className="pt-16">
        {dummyList.length === 0 ? (
          <div className="flex flex-col items-center mt-40">
          <img src={Dove} className="h-20" />
        <p className=" text-white text-sm mt-4">후원글이 없습니다</p>
        </div>
        ) : (
          dummyList.map((item, id) => (
            <div className="flex flex-col px-6 py-1">
              <button onClick={() => gotoSponsorDetail(item.id)}>
               <SponsorItem key={id} data={item} />
               </button>
            </div>
          ))
        )}
      </div>
      <NavigationBar />
    </>
  )
}

export default SponsorPage;