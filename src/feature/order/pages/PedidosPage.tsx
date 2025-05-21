import { CartSheet } from "@/feature/order/components/sheets"
import ProductCardList from "@/feature/order/components/cards/ProductCardList"

export default function PedidosPage() {
  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <CartSheet />
      </div>

      <ProductCardList />
    </>
  )
}
