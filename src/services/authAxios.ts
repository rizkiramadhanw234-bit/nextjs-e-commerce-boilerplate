import api from "./axios";
import type { authType, authResponseType } from "@/types/authType";

export const login = async (data: authType) => {
  const res = await api.post<authResponseType>(`/auth/login`, {
    ...data,
    refreshToken: true,
    expiresInMins: 30,
  });
  return res.data;
};

export const logout = async () => {
  const res = await api.post<authResponseType>(`/auth/logout`);
  return res.data;
};
