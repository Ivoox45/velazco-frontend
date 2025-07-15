import { Input } from "@/components/ui/input";

interface SaleSearchInputProps {
  value: string;
  onChange: (value: string) => void;
  className?: string; // <-- Añadido aquí
}

export default function SaleSearchInput({
  value,
  onChange,
  className = "",
}: SaleSearchInputProps) {
  return (
    <Input
      placeholder="Buscar por cliente..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={className} // <-- Aplicado aquí
    />
  );
}
