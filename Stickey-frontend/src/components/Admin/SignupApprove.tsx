
interface IUser {
  name: string;
  id: number;
  profileImage: string | null;
}

interface SignupApproveProps {
  signUpResList: IUser[];
}

const SignupApprove: React.FC<SignupApproveProps> = ({ signUpResList }) => {
  return (
    <>
      <div>
        <div className="p-4">
          {signUpResList.map((user) => (
            <div className="flex justify-around items-center m-2 p-4 bg-[#2E2E3D] rounded-md text-white">
              <p>가입 단체명 : {user.name} ( ID: {user.id} )</p>
              <button className="bg-Stickey_Gray p-2 text-xs rounded-full text-black">가입내용보기</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SignupApprove;
