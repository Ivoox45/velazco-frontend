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
    X,
} from "lucide-react";


export default function CartSheet() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline">
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Carrito
                </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[400px] sm:w-[450px]">
                <SheetHeader>
                    <SheetTitle>Carrito de Pedido</SheetTitle>
                    <SheetDescription>
                        Revise los productos antes de confirmar el pedido.
                    </SheetDescription>
                </SheetHeader>

                <Label>
                    Nombre del Cliente
                </Label>

                <Input
                    type="text"
                    placeholder="Ej: Juan Pérez"
                    className="mb-4">
                </Input>
            </SheetContent>
        </Sheet>
    )
}