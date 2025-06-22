import { useEffect, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";

interface Props {
  setShowModal: Dispatch<SetStateAction<boolean>>;
  proprietarioParaEditar?: any;
  onSave?: (dados: any) => void;
}

export function FormProprietario({ setShowModal, proprietarioParaEditar, onSave }: Props) {
  const [formData, setFormData] = useState({
    name: proprietarioParaEditar?.name || "",
    cpf_cnpj: proprietarioParaEditar?.cpf_cnpj || "",
    phone: proprietarioParaEditar?.phone || "",
    email: proprietarioParaEditar?.email || "",
    street: proprietarioParaEditar?.street || "",
    number: proprietarioParaEditar?.number || 0,
    neighborhood: proprietarioParaEditar?.neighborhood || "",
    cep: proprietarioParaEditar?.cep || 0,
    userId: proprietarioParaEditar?.userId || "",
    cityId: proprietarioParaEditar?.cityId || 0,
  });

  const [cidades, setCidades] = useState<{ id: number; nome: string }[]>([]);

  useEffect(() => {
    // Substitua pelo seu endpoint real de cidades
    fetch("/api/cidades")
      .then((res) => res.json())
      .then((data) => setCidades(data));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSave) onSave(formData);
    setShowModal(false);
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-2xl w-full max-w-2xl shadow-lg">
        <h2 className="text-3xl font-bold mb-1 text-center">
          {proprietarioParaEditar ? "Editar Proprietário" : "Novo Proprietário"}
        </h2>
        <p className="text-gray-500 mb-6 text-center">
          Preencha os detalhes do proprietário. Todos os campos marcados com{" "}
          <span className="text-red-500">*</span> são obrigatórios.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Coluna 1 */}
            <div className="bg-gray-50 rounded-xl p-5 border">
              <h3 className="font-semibold text-lg mb-4">Informações Pessoais</h3>
              <div className="mb-3">
                <label className="block text-sm font-medium mb-1">
                  Nome <span className="text-red-500">*</span>
                </label>
                <Input
                  placeholder="Ex: João da Silva"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium mb-1">
                  CPF/CNPJ <span className="text-red-500">*</span>
                </label>
                <Input
                  placeholder="Ex: 123.456.789-00"
                  name="cpf_cnpj"
                  value={formData.cpf_cnpj}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium mb-1">
                  Telefone <span className="text-red-500">*</span>
                </label>
                <Input
                  placeholder="Ex: (11) 91234-5678"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium mb-1">
                  E-mail <span className="text-red-500">*</span>
                </label>
                <Input
                  placeholder="Ex: joao@email.com"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            {/* Coluna 2 */}
            <div className="bg-gray-50 rounded-xl p-5 border">
              <h3 className="font-semibold text-lg mb-4">Endereço</h3>
              <div className="mb-3">
                <label className="block text-sm font-medium mb-1">
                  Rua <span className="text-red-500">*</span>
                </label>
                <Input
                  placeholder="Ex: Rua das Flores"
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium mb-1">
                  Número <span className="text-red-500">*</span>
                </label>
                <Input
                  type="number"
                  placeholder="Ex: 123"
                  name="number"
                  value={formData.number}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium mb-1">
                  Bairro <span className="text-red-500">*</span>
                </label>
                <Input
                  placeholder="Ex: Centro"
                  name="neighborhood"
                  value={formData.neighborhood}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium mb-1">
                  CEP <span className="text-red-500">*</span>
                </label>
                <Input
                  type="number"
                  placeholder="Ex: 22000000"
                  name="cep"
                  value={formData.cep}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium mb-1">
                  Cidade <span className="text-red-500">*</span>
                </label>
                <select
                  name="cityId"
                  value={formData.cityId}
                  onChange={handleChange}
                  required
                  className="w-full border p-2 rounded"
                >
                  <option value="">Selecione uma cidade</option>
                  {cidades.map((cidade) => (
                    <option key={cidade.id} value={cidade.id}>
                      {cidade.nome}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-4 pt-8">
            <Button type="submit" className="bg-green-600 hover:bg-green-700 px-8">
              Salvar
            </Button>
            <Button
              type="button"
              variant="outline"
              className="px-8"
              onClick={handleCancel}
            >
              Cancelar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}