import { useMutation } from "@tanstack/react-query";
import { changePassword } from "../../service/ChangePW/api";

export const useChangePW = () => {
  return useMutation({
    mutationFn: (password:string) => changePassword(password)
  })
}
