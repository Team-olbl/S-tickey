import Header, { IHeaderInfo } from "../../../components/@common/Header";
import NavigationBar from "../../../components/@common/NavigationBar";
import Back from '../../../assets/image/Back.png'

const BookSectionPage = () => {

  const info : IHeaderInfo = {
    left_1:  null,
    left_2: <img src={Back} alt="" />,
    center:'',
    right: <img src="src/assets/Alarm/Bell.png" alt="" />
  }


  return(
    <>
    <div>
      <Header info={info} />

      <div>


      </div>
      <NavigationBar />
    </div>
    </>
  )
}

export default BookSectionPage;