import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface CancelOrderDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function CancelOrderDialog({
  open,
  onClose,
  onConfirm,
}: CancelOrderDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cancelar Pedido</DialogTitle>
        </DialogHeader>
        <p>
          ¿Estás seguro de que deseas cancelar este pedido? Esta acción no se
          puede deshacer.
        </p>
        <DialogFooter className="justify-end">
          <Button variant="outline" onClick={onClose}>
            No
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            Sí, cancelar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
