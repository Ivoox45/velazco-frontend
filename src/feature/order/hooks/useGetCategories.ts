import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../api/order";

export default function useGetCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
}
