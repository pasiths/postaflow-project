import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface InputWithLabelProps {
  label: string;
  id: string;
  placeholder: string;
  type: string;
  value: string;
  error?: string;
  autoComplete?: string;
  disabled?: boolean;
  autoFocus?: boolean;
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function InputWithLabel({
  label,
  id,
  placeholder,
  type,
  value,
  error,
  autoComplete,
  disabled = false,
  autoFocus = false,
  required = false,
  onChange,
}: InputWithLabelProps) {
  return (
    <div className="space-y-1">
      <Label htmlFor={id} className="text-sm text-muted-foreground">
        {label}
      </Label>
      <Input
        id={id}
        name={id}
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        disabled={disabled}
        autoFocus={autoFocus}
        required={required}
        className="w-full"
      />
      {error && <p className="text-red-500 text-sm px-2">{error}</p>}
    </div>
  );
}
