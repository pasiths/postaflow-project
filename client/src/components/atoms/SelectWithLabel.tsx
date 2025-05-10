import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface SelectWithLabelProps {
  label: string;
  id: string;
  placeholder: string;
  error?: string;
  disabled?: boolean;
  items: {
    id: number;
    item: string;
    value: string;
  }[];
  required?: boolean;
  onChange?: (value: string) => void;
}

const SelectWithLabel = ({
  label,
  id,
  placeholder,
  error,
  items,
  disabled = false,
  required = false,
  onChange,
}: SelectWithLabelProps) => {
  return (
    <div className="space-y-1">
      <Label htmlFor={id} className="text-sm text-muted-foreground">
        {label}
      </Label>
      <Select disabled={disabled} required={required} onValueChange={onChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {items.map((item) => (
            <SelectItem key={item.id} value={item.value}>
              {item.item}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && <p className="text-red-500 text-sm px-2">{error}</p>}
    </div>
  );
};

export default SelectWithLabel;
