import {
    Sheet,
    SheetTrigger,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
    ShoppingCart,
    Trash,
    Plus,
    Minus,
} from "lucide-react";
import { useCart } from "@/providers/CartProvider";
import { useState } from "react";
import { toast } from "sonner";
import useStartOrder from "@/feature/order/hooks/useStartOrder";

export default function CartSheet() {
    const { cart, addToCart, removeFromCart, clearCart } = useCart();
    const [customerName, setCustomerName] = useState("");
    const startOrder = useStartOrder();


    // Disminuir cantidad o eliminar si llega a 0
    const handleDecrease = (productId: number) => {
        const item = cart.find((p) => p.id === productId);
        if (item && item.quantity > 1) {
            const updated = cart.map((p) =>
                p.id === productId ? { ...p, quantity: p.quantity - 1 } : p
            );
            clearCart();
            updated.forEach((p) => {
                for (let i = 0; i < p.quantity; i++) addToCart(p);
            });
        } else {
            removeFromCart(productId);
        }
    };

    // Totales
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const igv = parseFloat((subtotal * 0.18).toFixed(2));
    const total = subtotal + igv;

    const handleConfirm = () => {
        if (cart.length === 0) {
            toast.error("No hay productos en el carrito.");
            return;
        }

        if (!customerName.trim()) {
            toast.warning("Por favor, ingresa el nombre del cliente.");
            return;
        }

        // Armar la request
        const orderRequest = {
            clientName: customerName.trim(),
            details: cart.map((item) => ({
                productId: item.id,
                quantity: item.quantity,
            })),
        };

        startOrder.mutate(orderRequest, {
            onSuccess: (data) => {
                toast.success("Pedido creado con éxito", {
                    description: `Pedido #${data.id} registrado.`,
                });
                setCustomerName("");
                clearCart();
            },
            onError: (error) => {
                toast.error("Error al crear el pedido", {
                    description: error.message,
                });
            },
        });
    };

    // Cancelar
    const handleClearCart = () => {
        clearCart();
        toast.info("Carrito vaciado correctamente.");
    };

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" className="relative">
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Carrito
                    {totalItems > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                            {totalItems}
                        </span>
                    )}
                </Button>
            </SheetTrigger>

            <SheetContent
                side="right"
                className="w-[400px] sm:w-[450px] flex flex-col justify-between"
            >
                <div className="flex-1 overflow-y-auto">
                    <SheetHeader className="px-4">
                        <SheetTitle>Carrito de Pedido</SheetTitle>
                        <SheetDescription>
                            Revise los productos antes de confirmar el pedido.
                        </SheetDescription>
                    </SheetHeader>

                    <div className="mt-6 space-y-6 px-4">
                        {cart.map((item) => (
                            <div key={item.id} className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-md bg-muted overflow-hidden">
                                    <img
                                        src="https://placehold.co/120"
                                        alt={item.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="flex-1">
                                    <div className="font-medium">{item.name}</div>
                                    <div className="text-sm text-muted-foreground">
                                        ${item.price.toFixed(2)}
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button
                                        size="icon"
                                        variant="outline"
                                        onClick={() => handleDecrease(item.id)}
                                    >
                                        <Minus className="w-4 h-4" />
                                    </Button>
                                    <span className="w-6 text-center">{item.quantity}</span>
                                    <Button
                                        size="icon"
                                        variant="outline"
                                        onClick={() => {
                                            if (item.quantity >= item.stock) {
                                                toast.warning("Stock insuficiente", {
                                                    description: `Solo hay ${item.stock} unidades de "${item.name}" disponibles.`,
                                                });
                                                return;
                                            }
                                            addToCart(item);
                                        }}
                                    >
                                        <Plus className="w-4 h-4" />
                                    </Button>
                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        onClick={() => removeFromCart(item.id)}
                                    >
                                        <Trash className="w-4 h-4 text-destructive" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 space-y-4 text-sm border-t pt-6 px-4">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Impuestos</span>
                            <span>${igv.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between font-semibold">
                            <span>Total</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                    </div>

                    <div className="mt-8 space-y-2 px-4">
                        <Label>Nombre del Cliente</Label>
                        <Input
                            placeholder="Ingrese el nombre del cliente"
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                        />
                    </div>
                </div>

                <div className="mt-6 flex justify-between px-4 pb-6">
                    <Button variant="outline" onClick={handleClearCart}>
                        Cancelar
                    </Button>
                    <Button variant="default" onClick={handleConfirm}>
                        Confirmar Pedido
                    </Button>
                </div>
            </SheetContent>
        </Sheet>
    );
}
