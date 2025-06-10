import { useMutation, useQueryClient } from "@tanstack/react-query";
import { confirmDispatch } from "../api/dispatch";

export default function useConfirmDispatch() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => confirmDispatch(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === "dispatch-orders",
      });
    },
  });
}
