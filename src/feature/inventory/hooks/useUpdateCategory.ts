import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCategory } from "../api/category";
import type { UpdateCategory, CategoryUpdateResponse } from "../types";

export default function useUpdateCategory() {
    const queryClient = useQueryClient();

    return useMutation<
        CategoryUpdateResponse,
        Error,
        { id: number; data: UpdateCategory }
    >({
        mutationFn: ({ id, data }) => updateCategory(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] });
            queryClient.invalidateQueries({ queryKey: ["products"] });
        },
    });
}
