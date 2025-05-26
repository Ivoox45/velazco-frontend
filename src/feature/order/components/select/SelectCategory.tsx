import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
} from "@/components/ui/select";
import useGetCategories from "../../hooks/useGetCategories";

type Props = {
    selected: string;
    onChange: (value: string) => void;
    className?: string;
};

export default function SelectCategory({ selected, onChange }: Props) {
    const { data: categories, isLoading } = useGetCategories();

    return (
        <Select value={selected} onValueChange={onChange} disabled={isLoading}>
            <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Seleccionar categoría" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="Todos">Todos</SelectItem>
                {categories?.map((cat) => (
                    <SelectItem key={cat.id} value={cat.name}>
                        {cat.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
