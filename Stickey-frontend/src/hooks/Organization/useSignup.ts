import { useMutation } from '@tanstack/react-query';
import { signupRes } from '../../types/OrganizationSignup';
import { signup } from '../../service/OrganizationUser/api';

export const useSignup = () => {
  const mutation = useMutation<signupRes, Error, FormData>({
    mutationFn: signup,
    onSuccess: data => {
      console.log('회원가입이 완료되었습니다.', data);
    },
    onError: (error: Error) => {
      console.log('회원가입에 실패했습니다.', error);
    },
  });
  return mutation;
};
