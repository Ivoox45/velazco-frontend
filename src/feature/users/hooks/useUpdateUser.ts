import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "../api/user";
import type { UserUpdateRequestDto } from "../types";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: UserUpdateRequestDto }) =>
      updateUser(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}
