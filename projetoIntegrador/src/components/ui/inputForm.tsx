interface InputFormProps {
  label: string;
  type: string;
  placeholder?: string;
  value: string | number;
  setValue: (value: string) => void; // Altere aqui
}

export function InputForm({ label, type, placeholder, value, setValue }: InputFormProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium">{label}</label>
      <input
        type={type}
        className="border rounded px-3 py-2"
        placeholder={placeholder}
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    </div>
  );
}
