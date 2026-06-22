import api from "./axios";
import type { authType, authResponseType } from "@/types/authType";

export const login = async (data: authType) => {
  const res = await api.post<authResponseType>(`/auth/login`, data);
  return res.data;
};

export const logout = async () => {
  const res = await api.post<authResponseType>(`/auth/logout`);
  return res.data;
};
