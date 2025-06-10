import { Input } from "@/components/ui/input";

interface DispatchSearchInputProps {
    value: string;
    onChange: (value: string) => void;
}


export default function DispatchSearchInput({value, onChange}: DispatchSearchInputProps) {
    return (
        <Input
            placeholder="Buscar por cliente..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
    );

}