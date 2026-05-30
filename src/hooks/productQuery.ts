import { useQuery } from "@tanstack/react-query";
import {
  getAllProducts,
  getProductById,
  searchProduct,
  getAllCategories,
  getProductByCategory,
} from "@/services/productAxios";

export const productKeys = {
  all: ["products"] as const,
  list: (limit: number, skip: number) =>
    [...productKeys.all, "list", { limit, skip }] as const,
  byId: (id: number) => [...productKeys.all, "byId", id] as const,
  search: (query: string) => [...productKeys.all, "search", query] as const,
  categories: () => [...productKeys.all, "categories"] as const,
  category: (category: string) =>
    [...productKeys.all, "category", category] as const,
};

// get All Products
export const useGetAllProducts = (limit: number, skip: number) => {
  return useQuery({
    queryKey: productKeys.list(limit, skip),
    queryFn: async () => {
      const res = await getAllProducts(limit, skip);
      return res;
    },
  });
};

// get product by id
export const useGetProductById = (id: number) => {
  return useQuery({
    queryKey: productKeys.byId(id),
    queryFn: async () => {
      const res = await getProductById(id);
      return res;
    },
    enabled: !!id,
  });
};

// search products
export const useSearchProducts = (query: string) => {
  return useQuery({
    queryKey: productKeys.search(query),
    queryFn: async () => {
      const res = await searchProduct(query);
      return res;
    },
    enabled: query.trim().length > 0,
  });
};

// get all categories
export const useGetAllCategories = () => {
  return useQuery({
    queryKey: productKeys.categories(),
    queryFn: async () => {
      const res = await getAllCategories();
      return res;
    },
    staleTime: 1000 * 60 * 10,
  });
};

// get product by category
export const useGetProductByCategory = (category: string) => {
  return useQuery({
    queryKey: productKeys.category(category),
    queryFn: async () => {
      const res = await getProductByCategory(category);
      return res;
    },
    enabled: !!category,
  });
};
