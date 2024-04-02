import { useNavigate } from 'react-router-dom'
import Splash from '../../assets/image/splash.png'
import { useEffect } from 'react'

const SplashPage = () => {
    
    const navigate = useNavigate()
    const goMain = () => {
        navigate('/');
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            goMain();
        }, 5000);

        return () => clearTimeout(timeout);
    }, []);

    return(
        <>
        <div className='flex flex-col justify-center items-center pb-32 w-full h-screen'>
          <img src={Splash} />
          <div onClick={goMain} className='border text-Stickey_Gray px-8 py-3 rounded-full font-bold'>시작하기</div>
        </div>
        </>
    )
}
export default SplashPage