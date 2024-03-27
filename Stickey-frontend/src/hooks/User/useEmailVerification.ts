import { useMutation } from "@tanstack/react-query"
import { sendEmailVerification } from "../../service/User/api"

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
