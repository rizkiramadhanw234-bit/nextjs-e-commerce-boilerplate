import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserData } from "@/services/userAxios";
import type { updateUser } from "@/types/userType";

export const userKeys = {
  user: (id: number) => ["user", id] as const,
};
export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: updateUser }) => {
      const res = await updateUserData(id, data);
      return res;
    },
    onSuccess: (res) => {
      const userId = res.id;
      queryClient.invalidateQueries({
        queryKey: userKeys.user(userId),
      });
    },
    onError: (err) => console.error(err),
  });
};
