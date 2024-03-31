import { axiosAuthInstance } from "../../apis/axiosInstance";

export const logout = async () => {
  const res = await axiosAuthInstance.get(`users/logout`, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
    }
  });
  console.log(res);
  return res.data;
};
