import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "../api/user";
import type { UserUpdateRequestDto, UserUpdateResponseDto } from "../types";

interface UpdateUserParams {
  id: number;
  payload: UserUpdateRequestDto;
}

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation<UserUpdateResponseDto, Error, UpdateUserParams>({
    mutationFn: ({ id, payload }) => updateUser(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["roles"] });
    },
  });
}
