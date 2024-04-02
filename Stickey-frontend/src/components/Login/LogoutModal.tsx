import Modal from '../@common/Modal'
import Crying from '../../assets/image/Crying2.png'
import userStore from "../../stores/userStore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const LogoutModal = ({ onClose }: { onClose: () => void; }) => {
	const navigate = useNavigate();
	const { logoutUser } = userStore();

	const handleLogout = () => {
    logoutUser();
    toast.success("로그아웃 되었습니다.");
    navigate('/home',)
  }
    
    return (
        <Modal width="300px" height="auto" title="" onClose={onClose}>
					<div className="flex flex-col items-center px-4 pb-6">
						<div className=''>
							<img className='w-16' src={Crying} />
						</div>
						<div className='py-2'>
							<p className="text-xs">로그아웃 하시겠습니까 ?</p>
						</div>
						<div className="flex justify-center space-x-2 pt-4">
								<button className="bg-[#5959E7] w-20 text-white px-4 py-1 rounded-lg text-xs" onClick={handleLogout} >로그아웃</button>
								<button className="bg-gray-500 w-20 text-white px-4 py-1 rounded-lg text-xs" onClick={onClose}>취소</button>
						</div>
					</div>
        </Modal>
    )
    
}


export default LogoutModal;