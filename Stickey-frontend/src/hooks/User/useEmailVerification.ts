import { useMutation } from "@tanstack/react-query"
import { confirmEmailVerification, sendEmailVerification, signUp } from "../../service/PersonalUser/api"
import { confirmEmailReq, confirmEmailRes, signupRes } from "../../types/PersonalSignup";

export const useEmailVerificationMutation = () => {
  const mutation = useMutation<string, Error, string>({
    mutationFn: sendEmailVerification,
    onSuccess: (data) => {
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
    onSuccess: (data) => {
      console.log('인증에 성공했습니다.', data)
    },
    onError: (error: Error) => {
      console.error('인증에 실패했습니다.', error)
    }
  })
  return mutation;
}

export const useSignup = () => {
  const mutation = useMutation<signupRes, Error, FormData>({
    mutationFn: signUp,
    onSuccess: (data) => {
      console.log('회원가입이 완료되었습니다.', data)
    },
    onError: (error: Error) => {
      console.error('회원가입에 실패했습니다.', error)
    }
  })
  return mutation;
}