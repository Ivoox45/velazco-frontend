// src/feature/auth/hooks/useLogin.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../api/auth";
import type { AuthLoginRequestDto, AuthLoginResponseDto } from "../types";

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation<AuthLoginResponseDto, Error, AuthLoginRequestDto>({
    mutationFn: login,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] }); // ¡Esto es clave!
    },
  });
}
