import type { Product } from "../../types"
import {
    Card,
    CardContent,
    CardDescription,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"

type Props = {
    product: Product
    onAdd?: (product: Product) => void
}

export default function ProductCard({ product, onAdd }: Props) {
    return (
        <Card className="flex flex-col overflow-hidden rounded-2xl shadow-sm w-full mx-auto min-w-[270px]">


            <div className="p-4 py-0">
                <div className="bg-muted flex items-center justify-center rounded-xl overflow-hidden h-70 w-auto">
                    <img
                        src="https://placehold.co/1200x1200"
                        alt="Producto"
                        className="h-full w-full object-cover"
                    />
                </div>
            </div>


            {/* Contenido */}
            <CardContent className="flex-1 flex flex-col justify-between p-4 pt-2">
                <div>
                    <CardTitle className="text-base font-semibold flex justify-between items-center">
                        {product.name}
                        <div className="bg-black text-white text-xs px-2 py-1 rounded-full">
                            ${product.price.toFixed(2)}
                        </div>
                    </CardTitle>
                    <CardDescription className="text-sm mt-1">
                        {product.description || product.category?.name || "Sin categoría"}
                    </CardDescription>
                </div>

                <Button
                    onClick={() => onAdd?.(product)}
                    className="mt-4 w-full"
                    variant="default"
                >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Agregar
                </Button>
            </CardContent>
        </Card>
    )
}
