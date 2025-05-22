import { SaleSearchInput } from "@/feature/sale/components/input";
import { OrderFilterTabs } from "@/feature/sale/components/tabs";

export default function CajaPage() {
  return (
    <div className="space-y-4 px-4 sm:px-6 lg:px-8">
      <SaleSearchInput />
      <OrderFilterTabs />
    </div>
  );
}
