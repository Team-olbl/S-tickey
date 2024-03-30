import { useState } from "react";
import { useAdmin } from "../../hooks/Admin/useAdmin";
import PostApproveDetail from "./PostApproveDetail";


const PostApprove = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectId, setSelectId] = useState<number>(0);
  const { usePostApprove } = useAdmin();
  const { data: supportPosts, refetch } = usePostApprove();

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
          {supportPosts &&
            supportPosts.waitingSupportRes.length > 0 ?
            supportPosts.waitingSupportRes.map((post) => (
            <div className="m-2 p-4 bg-[#2E2E3D] rounded-md text-white" key={post.id}>
              <p className="py-1">{post.title}</p>
              <div className="flex items-center justify-between">
                <p className="py-1 text-xs">{post.organization.name} ( userID {post.organization.id} )</p>
                <button className="bg-Stickey_Gray p-2 text-xs rounded-full text-black"  onClick={() => handleModalOpen(post.id)}>내용보기</button>
              </div>
            </div>
            )) : 
            
            <div className="flex flex-col items-center mt-40">
            <p className=" text-white text-sm mt-4">대기 중인 후원 글이 없어요!</p>
          </div>
          
          }
        </div>
        {isModalOpen && 
          <PostApproveDetail id={selectId} onClose={handleModalClose} refetch={refetch} />
        }
      </div>
    </>
  );
};

export default PostApprove;
