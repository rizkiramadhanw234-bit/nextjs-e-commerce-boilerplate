"use client";

import type { productType } from "@/types/productType";
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
import { useCallback } from "react";

interface ProductCardProps {
  product: productType;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addToCart = useAddToCart();
  const isCartAdding = addToCart.isPending;
  const isCartAdded = addToCart.isSuccess;
  const { user } = useAuthStore();

  const handleAddToCart = useCallback(
    async (id: number) => {
      await addToCart.mutateAsync({
        userId: user?.id || 0,
        products: [{ id, quantity: 1 }],
      });
    },
    [addToCart, user?.id],
  );

  return (
    <>
      <div>
        <Card className="w-80 h-full flex flex-col justify-between">
          <CardHeader>
            <div className="flex justify-center">
              <Link href={`/pages/product/${product.id}`}>
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  width={200}
                  height={200}
                />
              </Link>
            </div>
            <CardTitle>{product.title}</CardTitle>
            <CardDescription>{product.description}</CardDescription>
            <CardAction>sdsds</CardAction>
          </CardHeader>

          <CardContent>
            <p>Category: {product.category}</p>
            <p className="mt-1">$ {product.price}</p>
            <p className="mt-1">Stock: {product.stock}</p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => handleAddToCart(product.id)}>
              {isCartAdding
                ? "Adding..."
                : isCartAdded
                  ? "Added"
                  : "Add to Cart"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
