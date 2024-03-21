import Header, { IHeaderInfo } from "../../../components/@common/Header";
import Bell from '../../../assets/image/Bell.png';
import NavigationBar from "../../../components/@common/NavigationBar";

export interface DummyUserInfo {
  name: string;
  phoneNumber: string;
  email: string;
}
const dummyUser: DummyUserInfo = {
  name: "최더미",
  phoneNumber: "010-1234-5678",
  email: "dummy@example.com",
};

const BookPaymentPage = () => {

  const info : IHeaderInfo = {
    left_1:  null,
    left_2: null,
    center:'예매하기',
    right: <img src={Bell} />
  }


  return(
    <>
    <Header info={info} />
      <div className="px-8">
        
        <div className="flex flex-col items-center">
          {/* 스텝바 */}
          <div className="pt-16 pb-4 w-[150px]">
              <div className="relative after:absolute after:inset-x-0 after:top-1/2 after:block after:h-0.5 after:-translate-y-1/2 after:rounded-lg after:bg-gray-100">
                  <ol className="relative z-10 flex justify-between">
                  <li className="flex items-center">
                  <span className="size-5 rounded-full bg-Stickey_Main border-2 border-Stickey_Main text-center text-xs"> 1 </span>

                  </li>

                  <li className="flex items-center p-2">
                      <span className="size-5 rounded-full bg-Stickey_Main border-2 border-Stickey_Main text-center text-xs"> 2 </span>
                  </li>

                  <li className="flex items-center">
                      <span className="size-5 rounded-full bg-Stickey_Main border-2 border-Stickey_Main text-center text-xs"> 3 </span>
                  </li>
                  </ol>
              </div>
              </div>

              <div className="pb-2 text-white text-sm">
                  <p>회원정보 확인</p>
              </div>

              {/* 회원정보 */}
              <div className="bg-[#2E2E3D] w-full h-auto p-6 text-white text-sm rounded-lg">
                <div>이름 : {dummyUser.name}</div>
                <div className="py-2">전화번호 : {dummyUser.phoneNumber}</div>
                <div>이메일 : {dummyUser.email}</div>
              </div>

              <div className="py-3 text-white text-sm">
                  <p>예매정보 확인</p>
              </div>

              {/* 예매정보 */}
              <div className="bg-[#2E2E3D] w-full h-auto p-6 text-white text-sm rounded-lg">
                <div className="py-2">예매경기 : {dummyUser.name}</div>
                <div className="py-2">경기장소 : </div>
                <div className="py-2">경기일정 : </div>
                <div className="py-2">좌석등급 : </div>
                <div className="py-2">좌석선택 : </div>
                <div className="py-2">결제가격 : </div>
                <div className="py-2">취소기한 : </div>

              </div>

              {/* 결제버튼 */}
              <div className="w-full max-w-[500px] px-4 pt-6 pb-24 flex justify-center">
                  <button className="bg-Stickey_Gray w-1/2 mr-2 p-3 text-xs rounded-md">이전</button>
                  <button className="bg-Stickey_Main w-1/2 p-3 text-xs rounded-md">결제하기</button>
              </div>
        </div>

      </div>
      <NavigationBar />
    </>
  )
}

export default BookPaymentPage;