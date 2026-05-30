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
import { useRef } from "react";

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";

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
  const isFiltering = categoryProducts.isSuccess;

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

  const isLoading = isSearching
    ? searchProducts.isLoading
    : isFiltering
      ? categoryProducts.isLoading
      : allProducts.isLoading;

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (debouncedSearch.current) clearTimeout(debouncedSearch.current);
    const value = e.target.value;
    debouncedSearch.current = setTimeout(() => {
      setSearch(value);
    }, 500);
  };

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );

  return (
    <>
      <div>
        <div className="flex justify-between items-center mb-2">
          <div>
            <input
              type="text"
              placeholder="Search..."
              defaultValue={search}
              onChange={handleSearch}
              className="border border-gray-300 rounded-sm px-2 py-1 w-50 mb-4"
            />
            <button
              className="relative -left-5 text-gray-400"
              onClick={() => setSearch("")}
            >
              x
            </button>
          </div>

          <div className="flex items-center gap-2">
            <Combobox
              items={categoryOptions}
              onValueChange={(value) => setCategory(value as string)}
            >
              <ComboboxInput placeholder="Select a category" />
              <ComboboxContent>
                <ComboboxEmpty>No items found.</ComboboxEmpty>
                <ComboboxList>
                  {(item) => (
                    <ComboboxItem key={item} value={item}>
                      {item}
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          </div>
        </div>

        {isLoading ? (
          <div>
            <p>Loading...</p>
          </div>
        ) : products?.length === 0 ? (
          <div>
            <p>No products found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-10">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        <div className="mt-7 mb-4">
          <Paginations totalPages={totalPages} />
        </div>
      </div>
    </>
  );
}
