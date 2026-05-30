"use client";

import { useGetProductById } from "@/hooks/productQuery";
import { useParams } from "next/navigation";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import Link from "next/link";

import { useAddToCart } from "@/hooks/cartQuery";
import { useAuthStore } from "@/stores/authStore";

export default function ProductByIdPage() {
  const { id } = useParams();
  const { user } = useAuthStore();
  const productById = useGetProductById(Number(id));
  const productResults = productById.data;
  const isLoading = productById.isLoading;

  const addToCart = useAddToCart();
  const isCartAdding = addToCart.isPending;
  const isCartAdded = addToCart.isSuccess;

  const handleAddToCart = async (id: number) => {
    await addToCart.mutateAsync({
      userId: user?.id || 0,
      products: [{ id, quantity: 1 }],
    });
  };

  if (isLoading)
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p>Loading...</p>
      </div>
    );

  return (
    <>
      <Card className="w-100 h-full">
        <CardHeader>
          <div className="flex justify-center">
            <img
              src={productResults?.thumbnail}
              alt={productResults?.title}
              width={200}
              height={200}
            />
          </div>
          <CardTitle>{productResults?.title}</CardTitle>
          <CardDescription>{productResults?.description}</CardDescription>
          <CardAction>sdsds</CardAction>
        </CardHeader>

        <CardContent>
          <p>Category: {productResults?.category}</p>
          <p className="mt-1">$ {productResults?.price}</p>
          <p className="mt-1">Stock: {productResults?.stock}</p>
        </CardContent>
        <CardFooter className="flex flex-row gap-4">
          <Button onClick={() => handleAddToCart(productResults?.id || 0)}>
            {isCartAdding ? "Adding..." : isCartAdded ? "Added" : "Add to cart"}
          </Button>
          <Link href="/pages/cart">Buy Now!</Link>
        </CardFooter>
      </Card>
    </>
  );
}
