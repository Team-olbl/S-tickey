import { useMutation } from '@tanstack/react-query';
import { loginDataReq, loginDataRes } from '../../types/Login';
import { login } from '../../service/Login/api';

export const useLogin = () => {
  const mutation = useMutation<loginDataRes, Error, loginDataReq>({
    mutationFn: login,
    onSuccess: data => {
      console.log('로그인에 성공했습니다.', data);
    },
    onError: (error: Error) => {
      console.log('로그인에 실패했습니다.', error);
    },
  });
  return mutation;
};
