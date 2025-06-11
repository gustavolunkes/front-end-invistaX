import { useState } from "react";
import { InputForm } from "./inputForm";

interface FormReceitaProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  type: string;
}



export function FormReceita({ setShowModal, type }: FormReceitaProps) {  
    
  const [titulo, setTitulo] = useState("")
  const [descricao, setDescricao] = useState("")
  const [valor, setValor] = useState ("")
  const [data, setData] = useState ("")
  
  return (
    <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
      <div className="bg-white  p-6 rounded-lg w-full max-w-md shadow-lg">
        <h2 className="text-xl font-semibold mb-4">
          {type == "receita" ? "Nova receita" : "Nova despesa"}
        </h2>
        <h1>{titulo}</h1>
        <form className="space-y-4">
          <InputForm label="Título" type="text" placeholder="Ex: Aluguel" setValue={setTitulo} />
          <h1>{descricao}</h1>
          <InputForm
            setValue={setDescricao}
            label="Descrição"
            type="text"
            placeholder="Ex: Aluguel de apartamento"/>
          <h1>{valor}</h1>
          <InputForm setValue={setValor} label="Valor (R$)" type="number" placeholder="Ex: 1200" />
          <h1>{data}</h1>
          <InputForm setValue={setData} label="Data" type="date" placeholder="" />

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="bg-zinc-700 hover:bg-zinc-600 text-white font-medium py-2 px-4 rounded cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-2 px-4 rounded cursor-pointer"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
