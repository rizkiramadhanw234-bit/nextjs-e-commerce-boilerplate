import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getCartByUser,
  addToCart,
  updateCart,
  deleteCart,
} from "@/services/cartAxios";

import type { updateCartType } from "@/types/cartType";

export const cartKeys = {
  byUser: (userId: number) => ["byUser", userId] as const,
};

// get cart by user
export const useGetCartByUser = (userId: number) => {
  return useQuery({
    queryKey: cartKeys.byUser(userId),
    queryFn: async () => {
      const res = await getCartByUser(userId);
      return res;
    },
    enabled: !!userId,
  });
};

// add cart
export const useAddToCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addToCart,
    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: cartKeys.byUser(res.userId),
      });
    },
    onError: (err) => console.error(err),
  });
};

// update cart
export const useUpdateCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: updateCartType }) =>
      updateCart(id, data),

    onSuccess: (res) => {
      const userId = res.userId;
      queryClient.invalidateQueries({
        queryKey: cartKeys.byUser(userId),
      });
    },
    onError: (err) => console.error(err),
  });
};

// delete cart
export const useDeleteCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCart,
    onSuccess: (res) => {
      queryClient.removeQueries({
        queryKey: cartKeys.byUser(res.id),
      });
    },
    onError: (err) => console.error(err),
  });
};

// increment cart item
