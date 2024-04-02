import { useMutation, useQuery } from "@tanstack/react-query";
import { getSignupReq, getPostApproveReq, getSignupDetailReq, patchOrganizationStateReq, getPostApproveDetailReq, patchPostStateReq } from "../../service/Admin/api";


export const useAdmin = () => {

  const useSignup = () => {
    return useQuery({
      queryKey: ['signup'],
      queryFn: () => getSignupReq(),
      select: res => res.data
    })
  }

  const useSignupDetail = (id: number) => {
    return useQuery({
      queryKey: ['signupDetail', id],
      queryFn: () => getSignupDetailReq(id),
      select: res => res.data
    })
  }

  const usePatchOrganizationState = () => {
    return useMutation({
      mutationFn: patchOrganizationStateReq,
    })
  }

  const usePostApprove = () => {
    return useQuery({
      queryKey: ['postApprove'],
      queryFn: () => getPostApproveReq(),
      select: res => res.data
    })
  }

  const usePostApproveDetail = (id: number) => {
    return useQuery({
      queryKey: ['signupDetail', id],
      queryFn: () => getPostApproveDetailReq(id),
      select: res => res.data
    })
  }

  const usePatchPostState = () => {
    return useMutation({
      mutationFn: patchPostStateReq,
    })
  }
  
  return { useSignup, useSignupDetail, usePostApprove, usePatchOrganizationState ,usePostApproveDetail, usePatchPostState }
}
