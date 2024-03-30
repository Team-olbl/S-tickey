import { toast } from "react-toastify";
import { useAdmin } from "../../hooks/Admin/useAdmin";
import Modal from "../@common/Modal";


const SignupApproveDetail = ({ id, onClose, refetch }: { id: number;  onClose: () => void, refetch : () => void}) => {

  const { useSignupDetail, usePatchOrganizationState } = useAdmin();
  const { data } = useSignupDetail(id);
  const { mutate } = usePatchOrganizationState();

  const handleApprove = () => {
    if (!confirm("승인하시겠습니까?")) return;
    mutate({ id, status: "1", message: "" }, {
      onSuccess: () => {
        toast.success("승인되었습니다.");
        refetch();
        onClose();
      },
      onError: () => {
        toast.error("에러가 발생했습니다.");
      }
    });
  }

  const handleReject = () => {
    if (!confirm("거절하시겠습니까?")) return;
    
    const message = prompt("거절 내용");
    mutate({ id, status: "2", message : message || "" }, {
      onSuccess: () => {
        toast.success("거절되었습니다.");
      },
      onError: () => {
        toast.error("에러가 발생했습니다.");
      }
    });

  }
  

  return (
    <Modal width="80vw" height="" title="" onClose={onClose}>
      <div className='flex flex-col items-center pb-4 overflow-y-scroll gap-5'>
        <div className="bg-Stickey_Gray rounded-2xl w-24 h-24 p-2">
          <img src={data?.profileImage} alt=""className="w-full h-full"/>
        </div>
        <div className="bg-Stickey_Gray rounded-2xl p-2">
          <p>단체명 : {data?.name}</p>
          <p>전화번호 : {data?.phone}</p>
          <p>주소 : {data?.address}</p>
          <p>이메일 : {data?.email}</p>
          <p>담당자 : {data?.manager}</p>
        </div>
        <div className="bg-Stickey_Gray rounded-2xl p-2"> 
          <p>사업자 등록번호 : {data?.registrationNumber}</p>
          
          <a href={data?.registrationFile} download className="text-center text-blue-700">
            <p>사업자 등록증</p>
          </a>
        </div>
        <div className="flex gap-5">
          <button className='w-20 text-xs text-white bg-Stickey_Main rounded-md p-1' onClick={handleApprove}>승인</button>
          <button className='w-20 text-xs text-white bg-Stickey_Main rounded-md p-1' onClick={handleReject}>거절</button>
        </div>
      </div>
    </Modal>
  )
}

export default SignupApproveDetail;