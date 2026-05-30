import api from "./axios";
import type { userType, updateUser } from "@/types/userType";

export const updateUserData = async (id: number, data: updateUser) => {
  const res = await api.put<userType>(`/users/${id}`, data);
  return res.data;
};
