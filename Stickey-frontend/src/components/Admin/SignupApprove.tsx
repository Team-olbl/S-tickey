import { useState } from "react";
import { useAdmin } from "../../hooks/Admin/useAdmin";
import SignupApproveDetail from "./SignupApproveDetail";

const SignupApprove = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectId, setSelectId] = useState<number>(0);
  const { useSignup } = useAdmin();
  const { data: waitingOrganizations, refetch } = useSignup();

  const handleModalOpen = (id : number) => {
    setIsModalOpen(true);
    setSelectId(id);
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      <div>
        <div className="p-4">
          {waitingOrganizations &&
            
            waitingOrganizations.signUpResList.length > 0 ?
            waitingOrganizations.signUpResList.map((user) => (
            <div key={user.id} className="flex justify-between items-center m-2 p-4 bg-[#2E2E3D] rounded-md text-white">
              <p>가입 단체명 : {user.name}</p>
              <button className="bg-Stickey_Gray p-2 text-xs rounded-full text-black" onClick={() => handleModalOpen(user.id)}>가입내용보기</button>
            </div>
            )) :
            
            <div className="flex flex-col items-center mt-40">
              <p className=" text-white text-sm mt-4">대기 중인 단체가 없어요!</p>
            </div>
          }
        </div>

        {isModalOpen && 
          <SignupApproveDetail id={selectId} onClose={handleModalClose} refetch={refetch} />
        }
      </div>
    </>
  );
};

export default SignupApprove;
