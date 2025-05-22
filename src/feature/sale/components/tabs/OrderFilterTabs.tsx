import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OrderList from "@/feature/sale/components/cards/OrderList";
import type { OrderListResponse } from "@/feature/sale/types";

const mockOrders: OrderListResponse[] = [
    {
        id: 1023,
        date: "2023-04-23T14:30:00",
        clientName: "María González",
        status: "PENDIENTE",
        attendedBy: {
            id: 1,
            name: "Empleado X",
        },
        details: [],
    },
    {
        id: 1022,
        date: "2023-04-23T12:15:00",
        clientName: "Carlos Rodríguez",
        status: "PENDIENTE",
        attendedBy: {
            id: 2,
            name: "Empleado Y",
        },
        details: [],
    },
    {
        id: 1011,
        date: "2023-04-22T16:45:00",
        clientName: "Laura Fernández",
        status: "PAGADO",
        attendedBy: {
            id: 3,
            name: "Empleado Z",
        },
        details: [],
    },
    {
        id: 1010,
        date: "2023-04-22T15:30:00",
        clientName: "Roberto Gómez",
        status: "PAGADO",
        attendedBy: {
            id: 4,
            name: "Empleado W",
        },
        details: [],
    },
    {
        id: 999,
        date: "2023-04-21T15:30:00",
        clientName: "Daniel Rodríguez",
        status: "CANCELADO",
        attendedBy: {
            id: 5,
            name: "Empleado V",
        },
        details: [],
        cancelReason: "Cliente canceló el pedido",
    },
    {
        id: 998,
        date: "2023-04-21T14:15:00",
        clientName: "Laura Martínez",
        status: "CANCELADO",
        attendedBy: {
            id: 6,
            name: "Empleado U",
        },
        details: [],
        cancelReason: "Producto no disponible",
    },
    {
        id: 997,
        date: "2023-04-21T13:00:00",
        clientName: "Carlos Díaz",
        status: "CANCELADO",
        attendedBy: {
            id: 7,
            name: "Empleado T",
        },
        details: [],
        cancelReason: "Error en el pedido",
    },
];



export default function OrderFilterTabs() {
    const pendientes = mockOrders.filter((o) => o.status === "PENDIENTE");
    const pagados = mockOrders.filter((o) => o.status === "PAGADO");
    const cancelados = mockOrders.filter((o) => o.status === "CANCELADO");

    return (
        <Tabs defaultValue="Pendientes" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="Pendientes">Pendientes</TabsTrigger>
                <TabsTrigger value="Pagados">Pagados</TabsTrigger>
                <TabsTrigger value="Cancelados">Cancelados</TabsTrigger>
            </TabsList>

            <TabsContent value="Pendientes">
                <OrderList
                    orders={pendientes}
                    title="Pedidos Pendientes de Pago"
                    description="Gestione los pagos de los pedidos realizados en tienda"
                />
            </TabsContent>

            <TabsContent value="Pagados">
                <OrderList
                    orders={pagados}
                    title="Pedidos Pagados"
                    description="Pedidos que ya han sido pagados exitosamente"
                />
            </TabsContent>

            <TabsContent value="Cancelados">
                <OrderList
                    orders={cancelados}
                    title="Pedidos Cancelados"
                    description="Pedidos que no pudieron completarse"
                />
            </TabsContent>
        </Tabs>
    );
}
