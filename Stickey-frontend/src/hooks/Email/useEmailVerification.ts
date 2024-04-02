import { useMutation } from '@tanstack/react-query';
import { sendEmailVerification } from '../../service/Email/api';
import { confirmEmailReq, confirmEmailRes, sendEmailRes } from '../../types/Email';
import { confirmEmailVerification } from '../../service/Email/api';

export const useEmailVerificationMutation = () => {
  const mutation = useMutation<sendEmailRes, Error, string>({
    mutationFn: sendEmailVerification,
    onSuccess: data => {
      console.log('이메일 인증번호 전송 완료:', data);
    },
    onError: (error: Error) => {
      console.error('이메일 인증번호 전송 실패:', error.message);
    },
  });
  return mutation;
};

export const useConfirmEmailVerificationMutation = () => {
  const mutation = useMutation<confirmEmailRes, Error, confirmEmailReq>({
    mutationFn: confirmEmailVerification,
    onSuccess: data => {
      console.log('인증에 성공했습니다.', data);
    },
    onError: (error: Error) => {
      console.error('인증에 실패했습니다.', error);
    },
  });
  return mutation;
};
