"use client";

import {
  useGetAllProducts,
  useSearchProducts,
  useGetAllCategories,
  useGetProductByCategory,
} from "@/hooks/productQuery";
import { useProductStore } from "@/stores/productStore";
import ProductCard from "./productCard";
import Paginations from "./Pagination";
import { useRef, useCallback } from "react";

import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";

export default function ProductList() {
  const debouncedSearch = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { page, search, setSearch, category, setCategory } = useProductStore();

  const limit = 10;
  const skip = (page - 1) * limit;

  const allProducts = useGetAllProducts(limit, skip);
  const searchProducts = useSearchProducts(search);
  const isSearching = search.trim().length > 0;
  const allCategories = useGetAllCategories();
  const categoryProducts = useGetProductByCategory(
    category !== "all" ? category : "",
  );

  const categoryList = allCategories.data ?? [];
  const categoryOptions = categoryList.map((cat) => cat.slug);
  const isFiltering = category !== "all";

  const products = isSearching
    ? (searchProducts.data?.products ?? [])
    : isFiltering
      ? (categoryProducts.data?.products ?? [])
      : (allProducts.data?.products ?? []);

  const totalProducts = isSearching
    ? (searchProducts.data?.total ?? 0)
    : isFiltering
      ? (categoryProducts.data?.total ?? 0)
      : (allProducts.data?.total ?? 0);

  const totalPages = Math.ceil(totalProducts / limit);

  const isLoading =
    searchProducts.isLoading ||
    categoryProducts.isLoading ||
    allProducts.isLoading;

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (debouncedSearch.current) clearTimeout(debouncedSearch.current);
      const value = e.target.value;
      debouncedSearch.current = setTimeout(() => {
        setSearch(value);
      }, 500);
    },
    [debouncedSearch, setSearch],
  );

  return (
    <>
      <div className="min-h-screen py-4 px-20">
        <div className="w-full flex-row items-center justify-center">
          <div className="flex justify-between items-center pb-4">
            <input
              type="text"
              placeholder="Search..."
              defaultValue={search}
              onChange={handleSearch}
              className="border border-gray-300 rounded-sm px-2 py-1 w-50"
            />

            <NativeSelect
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <NativeSelectOption value="all">
                Select Category
              </NativeSelectOption>
              {categoryOptions.map((item) => (
                <NativeSelectOption key={item} value={item}>
                  {item}
                </NativeSelectOption>
              ))}
            </NativeSelect>
          </div>
          {isLoading ? (
            <div className="h-screen flex items-center justify-center">
              <p>Loading...</p>
            </div>
          ) : (
            <>
              {products?.length === 0 ? (
                <div className="flex items-center justify-center">
                  <p>No products found.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-8">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        <div className="mt-7 mb-4">
          <Paginations totalPages={totalPages} />
        </div>
      </div>
    </>
  );
}
