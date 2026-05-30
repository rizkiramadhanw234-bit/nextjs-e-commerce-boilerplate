import api from "./axios";
import type {
  productType,
  productsResponse,
  categoriesResponse,
} from "@/types/productType";

export const getAllProducts = async (limit: number, skip: number) => {
  const res = await api.get<productsResponse>(
    `/products?limit=${limit}&skip=${skip}`,
  );
  return res.data;
};

export const getProductById = async (id: number) => {
  const res = await api.get<productType>(`/products/${id}`);
  return res.data;
};

export const searchProduct = async (query: string) => {
  const res = await api.get<productsResponse>(`/products/search?q=${query}`);
  return res.data;
};

export const getAllCategories = async () => {
  const res = await api.get<categoriesResponse>(`/products/categories`);
  return res.data;
};

export const getProductByCategory = async (category: string) => {
  const res = await api.get<productsResponse>(`/products/category/${category}`);
  return res.data;
};
