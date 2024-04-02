import { useMutation } from "@tanstack/react-query"
import { findPassword } from "../../service/FindPW/api"

export const useFindPW = () => {
  return useMutation({
    mutationFn: (email:string) => findPassword(email)
  })
}