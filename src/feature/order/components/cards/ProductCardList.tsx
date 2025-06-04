import { useState } from "react";
import useGetAvailableProducts from "@/feature/order/hooks/useGetAvailableProducts";
import ProductCard from "./ProductCard";
import type { Product } from "@/feature/order/types";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";

const PRODUCTS_PER_PAGE = 8;

type Props = {
    query: string;
    category: string;
};

export default function ProductCardList({ query, category }: Props) {
    const { data: products = [], isLoading } = useGetAvailableProducts();
    const [page, setPage] = useState(1);

    const filteredProducts = products.filter((p: Product) => {
        const matchesName = p.name.toLowerCase().includes(query.toLowerCase());
        const matchesCategory =
            category === "Todos" || p.category?.name === category;
        return matchesName && matchesCategory;
    });

    const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
    const paginatedProducts = filteredProducts.slice(
        (page - 1) * PRODUCTS_PER_PAGE,
        page * PRODUCTS_PER_PAGE
    );

    if (isLoading) {
        return (
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-x-4 gap-y-8">
                    {[...Array(PRODUCTS_PER_PAGE)].map((_, i) => (
                        <Skeleton
                            key={i}
                            className="h-[250px] w-full rounded-lg"
                        />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-x-4 gap-y-8">
                {paginatedProducts.map((product: Product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

            {totalPages > 1 && (
                <div className="mt-8 flex justify-center">
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    onClick={() =>
                                        setPage((p) => Math.max(p - 1, 1))
                                    }
                                    className={
                                        page === 1
                                            ? "pointer-events-none opacity-50"
                                            : ""
                                    }
                                />
                            </PaginationItem>
                            <PaginationItem>
                                <span className="text-sm px-3 py-1 border rounded-md">
                                    Página {page} de {totalPages}
                                </span>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationNext
                                    onClick={() =>
                                        setPage((p) =>
                                            Math.min(p + 1, totalPages)
                                        )
                                    }
                                    className={
                                        page === totalPages
                                            ? "pointer-events-none opacity-50"
                                            : ""
                                    }
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            )}
        </div>
    );
}
