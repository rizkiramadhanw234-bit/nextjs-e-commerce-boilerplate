import api from "./axios";
import type {
  cartType,
  cartResponse,
  addCartType,
  updateCartType,
} from "@/types/cartType";

export const getAllCarts = async (limit: number, skip: number) => {
  const res = await api.get<cartResponse>(`/carts?limit=${limit}&skip=${skip}`);
  return res.data;
};

export const getCartById = async (id: number) => {
  const res = await api.get<cartType>(`/carts/${id}`);
  return res.data;
};

export const getCartByUser = async (userId: number) => {
  const res = await api.get<cartResponse>(`/carts/user/${userId}`);
  return res.data;
};

export const addToCart = async (data: addCartType) => {
  const res = await api.post<cartType>(`/carts/add`, data);
  return res.data;
};

export const updateCart = async (id: number, data: updateCartType) => {
  const res = await api.put<cartType>(`/carts/${id}`, data);
  return res.data;
};

export const deleteCart = async (id: number) => {
  const res = await api.delete<cartType>(`/carts/${id}`);
  return res.data;
};
