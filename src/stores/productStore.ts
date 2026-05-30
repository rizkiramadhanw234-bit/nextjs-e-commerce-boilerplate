import { create } from "zustand";

interface ProductState {
  page: number;
  search: string;
  category: string;
  addToCart: number;
  setCategory: (category: string) => void;
  setSearch: (search: string) => void;
  setPage: (page: number) => void;
  setAddToCart: (id: number | null) => void;
}

export const useProductStore = create<ProductState>((set) => ({
  page: 1,
  search: "",
  category: "all",
  addToCart: 0,
  setCategory: (category) => set({ category: category }),
  setSearch: (search) => set({ search: search }),
  setPage: (page) => set({ page: page }),
  setAddToCart: (id) => set({ addToCart: id || 0 }),
}));
