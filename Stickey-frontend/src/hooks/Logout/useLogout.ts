import { useMutation } from '@tanstack/react-query';
import { logout } from '../../service/Logout/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import userStore from '../../stores/userStore';

const useLogout = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      console.log('로그아웃이 되었습니다.');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');

      // userStore의 logoutUser로 전환
      userStore.getState().logoutUser();

      toast.success('로그아웃되었습니다.');
      navigate('/login');
    },
    onError: (error: Error) => {
      console.log('로그아웃에 실패했습니다.', error.message);
    },
  });
};
export default useLogout;
