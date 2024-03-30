import { useState } from "react";
import unlock from  '../../assets/image/Unlocked.png'
import SignupApprove from "../../components/Admin/SignupApprove";
import PostApprove from "../../components/Admin/PostApprove";
import LogoutModal from "../../components/Login/LogoutModal";
import { useProfile } from "../../hooks/Profile/useProfile";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";
import NavigationBar from "../../components/@common/NavigationBar";


const AdminPage = () => {
    const { useGetProfile } = useProfile();

    const leftTab: string = '단체 회원 승인';
    const rightTab: string = '후원글 승인';
    const [activeTab, setActiveTab] = useState(leftTab);
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
    const { data : profileRes, isSuccess } = useGetProfile();
    
    if (isSuccess) {
        if (profileRes.data.role !== 'ADMIN') {
            toast.warn("잘못된 접근입니다.");
            return <Navigate to='/'></Navigate>
        }
    }

    const handleLeftTabClick = () => {
        setActiveTab(leftTab);
    };

    const handleRightTabClick = () => {
        setActiveTab(rightTab);
    };

    return(
        <>  
            {isSuccess &&
            <>
                {/* 관리자페이지 안내 */}
                <div className="flex justify-between items-center pt-4 px-8">
                    <p className="text-xl py-6 text-white">Stickey 관리자 페이지 입니다</p>
                    <div className="text-white flex items-center border rounded-lg p-2 cursor-pointer" onClick={() => setIsLogoutModalOpen(true)}>
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

                {activeTab === leftTab && <SignupApprove />}
                {activeTab === rightTab && <PostApprove />}
                { isLogoutModalOpen && <LogoutModal onClose={() => setIsLogoutModalOpen(false)} /> }
                </>}
            <NavigationBar />
        </>
    )
}

export default AdminPage;