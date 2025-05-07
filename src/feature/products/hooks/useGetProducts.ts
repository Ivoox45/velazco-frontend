import { useQuery } from "@tanstack/react-query";

function useGetProducts() {
    return useQuery({
        queryKey: ["products"],
        queryFn: async () => {
            const response = await fetch("http://localhost:8080/api/products");
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        },
    });
}

export default useGetProducts;
