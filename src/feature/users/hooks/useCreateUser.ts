import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser } from "../api/user";
import type { UserCreateRequestDto } from "../types";

export function useCreateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UserCreateRequestDto) => createUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      
    },
  });
}
