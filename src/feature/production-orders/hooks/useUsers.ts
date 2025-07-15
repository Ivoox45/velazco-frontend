
import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../api/production-orders";
import type { UserListResponseDto } from "../types";

export function useUsers() {
  return useQuery<UserListResponseDto[]>({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });
}
