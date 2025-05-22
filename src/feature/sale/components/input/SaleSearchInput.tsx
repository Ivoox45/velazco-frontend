import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function SaleSearchInput() {
    return (
        <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
                type="text"
                placeholder="Buscar pedidos..."
                className="pl-10"
            />
        </div>
    );
}
