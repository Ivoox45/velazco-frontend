import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCategory } from "../api/category";
import type { CreateCategory, CategoryCreateResponse } from "../types";

export default function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation<CategoryCreateResponse, Error, CreateCategory>({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
}
