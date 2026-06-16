"use client";

import { useGetCartByUser, useDeleteCart } from "@/hooks/cartQuery";
import { useAuthStore } from "@/stores/authStore";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function CartComponent() {
  const { user } = useAuthStore();
  const userId = user?.id || 0;
  const cartByUserId = useGetCartByUser(Number(userId));
  const { mutateAsync: deleteCart, isPending: isDeleting } = useDeleteCart();
  const isLoading = cartByUserId.isLoading;

  const cartByUserIdData = cartByUserId.data?.carts ?? [];

  const handleDeleteCart = async (id: number) => {
    await deleteCart(id);
  };

  return (
    <>
      {isLoading ? (
        <div className="min-h-screen flex justify-center items-center">
          <p>Loading...</p>
        </div>
      ) : (
        <div className="grid grid-cols-2">
          {cartByUserIdData.map((cart) =>
            cart.products.map((product) => (
              <div
                key={product.id}
                className="flex gap-4 items-center justify-between border-b p-4"
              >
                <img src={product.thumbnail} alt={product.title} />
                <div className="flex flex-col gap-2 items-start">
                  <p>{product.title}</p>
                  <p>Qty:{product.quantity}</p>
                  <p>$ {product.price}</p>
                  <p>$: {product.total}</p>
                </div>

                <Dialog>
                  <DialogTrigger
                    className={"bg-black px-4 py-1 text-white rounded-2xl"}
                  >
                    Delete
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Are you absolutely sure?</DialogTitle>
                      <DialogDescription>
                        This action cannot be undone. This will permanently
                        delete your account and remove your data from our
                        servers.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-row gap-4">
                      <Button onClick={() => handleDeleteCart(cart.id)}>
                        {isDeleting ? "Deleting..." : "Delete"}
                      </Button>
                      <DialogClose>Cancel</DialogClose>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            )),
          )}
        </div>
      )}
    </>
  );
}
