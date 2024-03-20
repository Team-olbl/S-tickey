import Header, { IHeaderInfo } from "../../../components/@common/Header";
import NavigationBar from "../../../components/@common/NavigationBar";
import Back from '../../../assets/image/Back.png'
import SponsorForm from "../../../components/Sponsor/SponsorForm";

const SponsorCreatePage = () => {

    const info : IHeaderInfo = {
        left: <img src={Back} alt="" />,
        center:'후원등록',
        right: <img src="src/assets/Alarm/Bell.png" alt="" />
      }


    return(
      <>
        <div className="top-0 bottom-0 h-screen bg-white">
            <Header info={info} />
            <SponsorForm />
            <NavigationBar />
        </div>
      </>
    )
  }
  
  export default SponsorCreatePage;