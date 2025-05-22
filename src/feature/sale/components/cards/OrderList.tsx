import SaleCard from "./SaleCard";
import type { OrderListResponse } from "@/feature/sale/types";

type Props = {
    orders: OrderListResponse[];
    title: string;
    description: string;
};

export default function OrderList({ orders, title, description }: Props) {
    return (
        <div className="space-y-6 py-4">
            <div>
                <h2 className="text-xl font-bold">{title}</h2>
                <p className="text-sm text-muted-foreground">{description}</p>
            </div>
            <div className="space-y-4">
                {orders.map((order) => (
                    <SaleCard key={order.id} order={order} />
                ))}
            </div>
        </div>
    );
}
