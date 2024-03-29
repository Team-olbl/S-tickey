
interface IPost {

    id: number;
    title: string;
    organization: {
      name: string;
      id: number;
      profileImage: string | null;
    };
}
interface IPostApproveProps {
    waitingSupportRes: IPost[];
  }

const PostApprove: React.FC<IPostApproveProps> = ({ waitingSupportRes }) => {
  return (
    <>
      <div>
        <div className="p-4">
          {waitingSupportRes.map((post) => (
            <div className="m-2 p-4 bg-[#2E2E3D] rounded-md text-white" key={post.id}>
              <p className="py-1">{post.title}</p>
              <div className="flex items-center justify-between">
                <p className="py-1 text-xs">{post.organization.name} ( userID {post.organization.id} )</p>
                <button className="bg-Stickey_Gray p-2 text-xs rounded-full text-black">내용보기</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PostApprove;
