import type { Product } from "../../types";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/providers/CartProvider";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

type Props = {
  product: Product;
  onAdd?: (product: Product) => void;
};

export default function ProductCard({ product }: Props) {
  const { cart, addToCart } = useCart();

  // Verificar si el producto ya está en el carrito
  const itemInCart = cart.find((p) => p.id === product.id);
  const currentQty = itemInCart?.quantity || 0;

  // Función para agregar producto al carrito con validaciones
  const handleAddToCart = () => {
    if (!product.active) {
      toast.warning("Producto no disponible", {
        description: `El producto "${product.name}" está inactivo.`,
      });
      return;
    }

    if (product.stock <= 0) {
      toast.warning("Stock agotado", {
        description: `El producto "${product.name}" no tiene stock disponible.`,
      });
      return;
    }

    if (currentQty >= product.stock) {
      toast.warning("Stock insuficiente", {
        description: `Solo hay ${product.stock} unidades disponibles de "${product.name}".`,
      });
      return;
    }

    addToCart(product);
    toast.success("Producto agregado", {
      description: product.name,
    });
  };

  return (
    <Card className="flex flex-col overflow-hidden rounded-2xl shadow-sm w-full mx-auto min-w-[170px]">
      {/* Imagen */}
      <div className="px-4">
        <div className="bg-muted flex items-center justify-center rounded-xl overflow-hidden aspect-square">
          {product.image && (
            <img
              src={
                product.image
                  ? `${import.meta.env.VITE_IMAGE_URL}${product.image}`
                  : "https://placehold.co/120x120?text=Sin+Imagen"
              }
              alt={product.name}
              className="w-full h-full object-cover"
            />
          )}
        </div>
      </div>

      {/* Contenido */}
      <CardContent className="flex-1 flex flex-col justify-between px-4 pb-3 pt-2">
        <div className="mb-3">
          <div className="flex justify-between items-center">
            <CardTitle className="text-base font-semibold">
              {product.name}
            </CardTitle>
            <Badge className="bg-black text-white text-xs px-2 py-1 rounded-full">
              S/.{product.price.toFixed(2)}
            </Badge>
          </div>
          <CardDescription className="text-sm mt-0.5">
            {product.description || product.category?.name || "Sin categoría"}
          </CardDescription>
        </div>

        <Button
          onClick={handleAddToCart}
          className="w-full"
          variant="default"
          disabled={
            !product.active || product.stock <= 0 || currentQty >= product.stock
          }
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          {!product.active
            ? "No disponible"
            : product.stock <= 0
            ? "Sin stock"
            : currentQty >= product.stock
            ? "Stock máximo"
            : "Agregar"}
        </Button>
      </CardContent>
    </Card>
  );
}
