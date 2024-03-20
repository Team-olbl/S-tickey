import { useNavigate } from "react-router-dom";

export interface IHeaderInfo {
  left: JSX.Element | null;
  center: string | null;
  right: JSX.Element | null;
}


const Header = (props: {info: IHeaderInfo}) => {
  const navigate = useNavigate();

  const  {left, center, right} = props.info;
  
  return (
    <div className="bg-Stickey_BGC w-[360px] h-[48px] px-4 fixed top-0 flex flex-row items-center justify-between border-b-[0.5px] border-white">
      <button className="text-white ">
        {left && <div className="w-4" onClick={() => navigate(-1)}>{left}</div>}
      </button>
      {center && (
        <p className="font-sans font-extrabold italic text-white">{ center }</p>
      )}
      <button onClick={() => navigate('/alarm')}>
        {right && <img src="src/assets/image/Bell.png" alt="Alarm" className="w-[32px] h-[32px]"/>}
      </button>
    </div>
  )

}

export default Header;