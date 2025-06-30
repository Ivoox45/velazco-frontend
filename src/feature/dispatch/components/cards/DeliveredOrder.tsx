import type { DeliveredOrder as DeliveredOrderType } from "../../types";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface DeliveredOrderProps {
  order: DeliveredOrderType;
}

export default function DeliveredOrder({ order }: DeliveredOrderProps) {
  return (
    <div className="p-4 border rounded-md">
      <h2 className="text-xl font-bold mb-2">Pedido PED-{order.id}</h2>
      <p>
        Cliente: <strong>{order.clientName}</strong>
      </p>
      <p>
        Estado: <strong>{order.status}</strong>
      </p>
      <p>
        Fecha del pedido:{" "}
        <strong>
          {format(new Date(order.date), "dd/MM/yyyy HH:mm", { locale: es })}
        </strong>
      </p>
      {order.deliveryDate && (
        <p>
          Fecha de entrega:{" "}
          <strong>
            {format(new Date(order.deliveryDate), "dd/MM/yyyy HH:mm", {
              locale: es,
            })}
          </strong>
        </p>
      )}

      <h3 className="mt-4 font-semibold">Detalles del pedido:</h3>
      <ul>
        {order.details.map((item, idx) => (
          <li key={idx}>
            {item.quantity} x {item.product.name} @ $
            {parseFloat(item.unitPrice).toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
}
