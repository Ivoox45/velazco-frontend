// src/feature/categories/hooks/useGetCategories.ts
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../api/category";

export default function useGetCategories() {
    return useQuery({
        queryKey: ["categories"],
        queryFn: getCategories,
    });
}
