import api from "./axios";
import type {
  authType,
  authResponseType,
  refreshTokenType,
} from "@/types/authType";

export const login = async (data: authType) => {
  const res = await api.post<authResponseType>(`/auth/login`, data);
  return res.data;
};

export const refreshToken = async (data: refreshTokenType) => {
  const res = await api.post<authResponseType>(`/auth/refresh`, {
    refreshToken: data.refreshToken,
    expiresInMins: 30,
  });
  return res.data;
};

export const checkAuth = async () => {
  const res = await api.get<authResponseType>(`/auth/me`);
  return res.data;
};

export const logout = async () => {
  const res = await api.post<authResponseType>(`/auth/logout`);
  return res.data;
};
