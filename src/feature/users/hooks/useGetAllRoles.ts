import { useQuery } from "@tanstack/react-query";
import { getAllRoles } from "../api/user";

export function useGetAllRoles() {
  return useQuery({
    queryKey: ["roles"],
    queryFn: getAllRoles,
  });
}
