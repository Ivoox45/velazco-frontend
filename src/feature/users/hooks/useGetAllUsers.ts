import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../api/user";

export function useGetAllUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });
}
