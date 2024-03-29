import { useState } from "react";
import unlock from  '../../assets/image/Unlocked.png'
import SignupApprove from "../../components/Admin/SignupApprove";
import PostApprove from "../../components/Admin/PostApprove";

// 가입승인 타입
interface ISignupResProps {
    signUpResList: {
      name: string;
      id: number;
      profileImage: string | null;
    }[];
    count: number;
  }
// 후원글승인 타입
interface IPostApproveProps {
    waitingSupportRes: {
    id: number;
    title: string;
    organization: {
        name: string;
        id: number;
        profileImage: string | null;
    };
    }[];
    count: number;
}

const AdminPage = () => {
    
    const leftTab: string = '단체 회원 승인';
    const rightTab: string = '후원글 승인';
    const [activeTab, setActiveTab] = useState(leftTab);

  const handleLeftTabClick = () => {
    setActiveTab(leftTab);
  };

  const handleRightTabClick = () => {
    setActiveTab(rightTab);
  };

  return(
    <>
        {/* 관리자페이지 안내 */}
        <div className="flex justify-between items-center pt-4 px-8">
            <p className="text-xl py-6 text-white">Stickey 관리자 페이지 입니다</p>
            <div className="text-white flex items-center border rounded-lg p-2">
                <img className="w-8 mr-2" src={unlock} />
                <p>로그아웃</p>
            </div>
        </div>
        
        {/* 탭바 */}
        <div className="text-sm w-full flex relative pb-2 text-center pt-8 max-w-[500px] ">
            <button
                onClick={handleLeftTabClick}
                className={activeTab === leftTab ? 'font-bold flex-1 text-Stickey_Main' : 'text-gray-500 flex-1'}
            >
                <p>{leftTab}</p>
            </button>
            <button
                onClick={handleRightTabClick}
                className={activeTab === rightTab ? 'font-bold flex-1 text-Stickey_Main' : 'text-gray-500 flex-1'}
            >
                <p>{rightTab}</p>
            </button>
            <button className="absolute bottom-0 left-0 w-full h-[1px] bg-gray-500">
                <div
                className={`${activeTab !== leftTab ? 'left-1/2' : 'left-0'} duration-500 ease-in-out relative bottom-[1px] z-10 w-1/2 h-[2px] bg-Stickey_Main`}
                ></div>
            </button>
        </div>

        {activeTab === leftTab && <SignupApprove signUpResList={SignupdummyData.signUpResList} />}
        {activeTab === rightTab && <PostApprove waitingSupportRes={PostdummyData.waitingSupportRes} />}
  </>
  )
}

export default AdminPage;


// 더미
const SignupdummyData: ISignupResProps = {
    signUpResList: [
      { name: "최민경", id: 1, profileImage: null },
      { name: "전찬혁", id: 2, profileImage: null },
      { name: "류지윤", id: 3, profileImage: null },
      { name: "최부광", id: 4, profileImage: null },
    ],
    count: 4
  };

const PostdummyData: IPostApproveProps = {
    waitingSupportRes: [
      {
        id: 1,
        title: "ㅇㅇ중학교 배구 유망주 체육관 수리 후원",
        organization: {
          name: "룰루랄라협회",
          id: 1,
          profileImage: "C:\\Users\\SSAFY\\Desktop\\heewon\\aaa.jpg"
        }
      },
      {
        id: 2,
        title: "ㅇㅇ고등학교 단체 축구 유니폼 기부",
        organization: {
          name: "하기싫다키키",
          id: 2,
          profileImage: "C:\\Users\\SSAFY\\Desktop\\heewon\\aaa.jpg"
        }
      }
    ],
    count: 2
  };