interface InputFormProps{
    label: string
    type: string
    placeholder: string
    setValue: React.Dispatch<React.SetStateAction<string>>
}

export function InputForm({label, type, placeholder, setValue}: InputFormProps) {
  return (
    <div>
      <label className="block text-sm font-medium">{label}</label>
      <input
        type={type}
        onChange={(e) => setValue(e.target.value)}
        className="w-full mt-1 p-2 border rounded-md bg-zinc-100 text-black"
        placeholder={placeholder}
      />
    </div>
  );
}
