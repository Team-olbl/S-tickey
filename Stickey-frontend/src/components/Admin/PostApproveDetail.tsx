import { toast } from "react-toastify";
import { useAdmin } from "../../hooks/Admin/useAdmin";
import Modal from "../@common/Modal";
import dayjs from "dayjs";
import { setSupport } from "../../service/web3/api";

const PostApproveDetail = ({ id, onClose, refetch }: { id: number;  onClose: () => void, refetch : () => void}) => {

  const { usePostApproveDetail, usePatchPostState } = useAdmin();
  const { data } = usePostApproveDetail(id);
  const { mutate } = usePatchPostState();

  const handleApprove = () => {
    if (!confirm("승인하시겠습니까?")) return;

    const time = Math.floor(new Date(data!.endTime).getTime() / 1000);

    (async () => {
      const tx = await setSupport(id, data!.organization.name, time);

      if (tx) {
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
      } else {
        toast.error("에러가 발생했습니다.");
      }
    })();

  }

  const handleReject = () => {
    if (!confirm("거절하시겠습니까?")) return;
    
    const message = prompt("거절 내용");
    mutate({ id, status: "2", message : message || "" }, {
      onSuccess: () => {
        toast.success("거절되었습니다.");
        refetch();
        onClose();
      },
      onError: () => {
        toast.error("에러가 발생했습니다.");
      }
    });

  }
  
  return (
    <Modal width="80vw" height="" title="" onClose={onClose}>
      <div className='flex flex-col items-center pb-4 overflow-y-scroll gap-5'>
          <p>{data?.organization.name}</p>
        <div className="bg-Stickey_Gray rounded-2xl w-24 h-24 p-2 text-center">
          <img src={data?.organization.profileImage} alt="" className="w-full h-full" />
        </div>
        <div className="bg-Stickey_Gray rounded-2xl p-2">
          <p>후원글 제목 : {data?.title}</p>
          <p>내용 : {data?.content}</p>
          <p>시작 일 : {dayjs(data?.startTime).format("YYYY년 MM월 DD일")}</p>
          <p>마감 일 : {dayjs(data?.endTime).format("YYYY년 MM월 DD일")}</p>
        </div>
        <div className="flex gap-5">
          <button className='w-20 text-xs text-white bg-Stickey_Main rounded-md p-1' onClick={handleApprove}>승인</button>
          <button className='w-20 text-xs text-white bg-Stickey_Main rounded-md p-1' onClick={handleReject}>거절</button>
        </div>
      </div>
    </Modal>
  )
}

export default PostApproveDetail;