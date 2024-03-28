import { useMutation } from "@tanstack/react-query"
import { signUp } from "../../service/IndividualUser/api"
import { signupRes } from "../../types/IndividualSignup";



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