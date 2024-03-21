import { useNavigate } from "react-router-dom";

const SponListPage = () => {

  const navigate = useNavigate();

  const gotoCreatePage = () => {
    navigate('/sponsor/create');
  };

  return(
    <>
      후원목록

      {/* 단체 회원일 경우에만 보이도록 로직 추가해야함 */}
      <div className="fixed bottom-16 w-full max-w-[360px] px-4 flex justify-end">
          <button className="flex justify-center text-4xl text-white bg-Stickey_Main w-12 h-12 rounded-full" onClick={() => gotoCreatePage()}>
          +</button>
      </div>

    </>
  )
}

export default SponListPage;