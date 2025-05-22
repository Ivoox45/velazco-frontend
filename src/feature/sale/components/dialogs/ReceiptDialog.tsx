import { Dialog, DialogContent } from "@/components/ui/dialog";
import type { OrderListResponse } from "@/feature/sale/types";

type Props = {
  open: boolean;
  onClose: () => void;
  order: OrderListResponse;
  paymentMethod: string;
};

export default function ReceiptDialog({ open, onClose, order, paymentMethod }: Props) {
  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-xl">
        {/* contenido aquí */}
        <p>Método de Pago: {paymentMethod}</p>
      </DialogContent>
    </Dialog>
  );
}
