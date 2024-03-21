import Header, { IHeaderInfo } from "../../../../components/@common/Header";
import NavigationBar from "../../../../components/@common/NavigationBar";
import Back from '../../../../assets/image/Back.png'
import Bell from '../../../../assets/image/Bell.png'


const info : IHeaderInfo = {
  left_1:  null,
  left_2: <img src={Back} />,
  center:'선호구단',
  right: <img src={Bell} />
}

const PreferredTeamPage = () => {

  return(
    <>
      <Header info={info} />
      <div>

      </div>
      <NavigationBar />
    </>
  )
}

export default PreferredTeamPage;