import useGetProducts from "@/feature/order/hooks/useGetProducts"
import ProductCard from "./ProductCard"
import type { Product } from "@/feature/order/types"

export default function ProductCardList() {
    const { data: products = [], isLoading } = useGetProducts();

    if (isLoading) {
        return (
            <div className="text-center mt-10 text-muted-foreground">
                Cargando productos...
            </div>
        );
    }

    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-x-4 gap-y-8">
                {products.map((product: Product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>

    );
}
