import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

interface Props {
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

export function FormImovel({ setShowModal }: Props) {
  const [formData, setFormData] = useState({
    nome: "",
    endereco: "",
    valorCompra: "",
    valorAtual: "",
    aluguelMensal: "",
    status: "vago",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Imóvel enviado:", formData);
    // Aqui você pode integrar com a API (ex: imovelRoute.createImovel(formData))
    setShowModal(false);
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
        <h2 className="text-xl font-bold mb-4">Novo Imóvel</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input placeholder="Nome do imóvel" name="nome" value={formData.nome} onChange={handleChange} />
          <Input placeholder="Endereço" name="endereco" value={formData.endereco} onChange={handleChange} />
          <Input type="number" placeholder="Valor de compra" name="valorCompra" value={formData.valorCompra} onChange={handleChange} />
          <Input type="number" placeholder="Valor atual" name="valorAtual" value={formData.valorAtual} onChange={handleChange} />
          <Input type="number" placeholder="Aluguel mensal" name="aluguelMensal" value={formData.aluguelMensal} onChange={handleChange} />
          <select name="status" value={formData.status} onChange={handleChange} className="w-full border p-2 rounded">
            <option value="vago">Vago</option>
            <option value="alugado">Alugado</option>
          </select>
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setShowModal(false)}>Cancelar</Button>
            <Button type="submit" className="bg-green-600 hover:bg-green-700">Salvar</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
