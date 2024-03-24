import Header, { IHeaderInfo } from "../../../../components/@common/Header";
import NavigationBar from "../../../../components/@common/NavigationBar";
import Back from '../../../../assets/image/Back.png';
import Bell from '../../../../assets/image/Bell.png';
import PlayerList from "../../../../components/Profile/Group/PlayerList";
import { useNavigate } from "react-router-dom";

const PlayerListPage = () => {
  const navigate = useNavigate();

  const info : IHeaderInfo = {
    left_1: null,
    left_2: <img src={Back} />,
    center: '선수 조회',
    right: <img src={Bell} />
  }

  return(
    <>
      <Header info={info}/>
      <div className="pt-16">
        <PlayerList />
        <div className="fixed bottom-16 w-full max-w-[500px] px-4 flex justify-end" onClick={() => navigate('/profile/playerlist/register')}>
          <button className="flex justify-center text-4xl text-white bg-Stickey_Main w-12 h-12 rounded-full">
          +</button>
      </div>
      </div>
      <NavigationBar />
    </>
  )
}

export default PlayerListPage;