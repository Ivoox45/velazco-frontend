import { CartSheet } from "@/feature/order/components/sheets";
import ProductCardList from "@/feature/order/components/cards/ProductCardList";
import { ProductSearchInput } from "@/feature/order/components/input";
import { SelectCategory } from "@/feature/order/components/select";
import { useState, useEffect } from "react";
import startTourPedidos from "../../../tours/startTourPedidos"; // <- Importa el tour SEPARADO

declare global {
  interface Window {
    startTour_pedidos?: () => void;
  }
}

export default function PedidosPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Todos");

  // Registrar la función del tour globalmente
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.startTour_pedidos = startTourPedidos;
    }
    return () => {
      if (typeof window !== "undefined") {
        delete window.startTour_pedidos;
      }
    };
  }, []);

  return (
    <>
      <div className="flex justify-end px-4 sm:px-6 lg:px-8 mt-2">
        <div className="cart-sheet-driver">
          <CartSheet />
        </div>
      </div>

      <div className="flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 my-4">
        <div className="search-driver flex-1">
          <ProductSearchInput value={query} onChange={setQuery} />
        </div>
        <div className="category-driver">
          <SelectCategory selected={category} onChange={setCategory} />
        </div>
      </div>

      <div className="cardlist-driver">
        <ProductCardList query={query} category={category} />
      </div>
    </>
  );
}
