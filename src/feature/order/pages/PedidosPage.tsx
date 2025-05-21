import { CartSheet } from "@/feature/order/components/sheets";
import ProductCardList from "@/feature/order/components/cards/ProductCardList";
import { ProductSearchInput } from "@/feature/order/components/input";
import { SelectCategory } from "@/feature/order/components/select";
import { useState } from "react";

export default function PedidosPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Todos");

  return (
    <>
      <div className="flex justify-end px-4 sm:px-6 lg:px-8 mt-2">
        <CartSheet />
      </div>

      <div className="flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 my-4">
        <ProductSearchInput value={query} onChange={setQuery} />
        <SelectCategory selected={category} onChange={setCategory} />
      </div>


      <ProductCardList query={query} category={category} />
    </>
  );
}
