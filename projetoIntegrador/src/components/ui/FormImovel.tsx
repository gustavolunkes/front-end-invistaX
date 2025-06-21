import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { Button } from "./button";
import { Input } from "./input";
import { Home, MapPin } from "lucide-react";
import { NumericFormat, PatternFormat } from "react-number-format";

interface Props {
  setShowModal: Dispatch<SetStateAction<boolean>>;
  imovelParaEditar?: typeof initialFormData; // Adicione esta prop
  onSave?: (data: typeof initialFormData) => void; // Callback para salvar
}

// Defina os valores iniciais fora do componente
const initialFormData = {
  nomeImovel: "",
  dateRegistration: "",
  valueRegistration: "",
  ownerId: "",
  phone: "",
  ativo: "",
  street: "",
  number: "",
  neighborhood: "",
  state: "",
  city: "",
  cep: "",
};

export function FormImovel({ setShowModal, imovelParaEditar, onSave }: Props) {
  // Mock de proprietários para exemplo
  const owners = [
    { id: "1", name: "João Silva" },
    { id: "2", name: "Maria Souza" },
    { id: "3", name: "Carlos Oliveira" },
  ];

  const estados = [
    { id: "SP", name: "São Paulo" },
    { id: "RJ", name: "Rio de Janeiro" },
    { id: "MG", name: "Minas Gerais" },
  ];

  const cidades = [
    { id: "1", nome: "São Paulo", estadoId: "SP" },
    { id: "2", nome: "Campinas", estadoId: "SP" },
    { id: "3", nome: "Rio de Janeiro", estadoId: "RJ" },
  ];

  const [formData, setFormData] = useState(
    imovelParaEditar ? imovelParaEditar : initialFormData
  );

  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nomeImovel || !formData.dateRegistration || !formData.valueRegistration) {
      setError("Preencha todos os campos obrigatórios.");
      return;
    }
    setError(null);
    if (onSave) onSave(formData); // Chama callback para salvar
    setShowModal(false);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-2xl w-full max-w-2xl shadow-2xl border border-gray-100">
        <form onSubmit={handleSubmit} className="space-y-8">
          <header className="mb-2 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-1">
              {imovelParaEditar ? "Editar Imóvel" : "Novo Imóvel"}
            </h2>
            <p className="text-gray-500 text-sm">
              Preencha os detalhes do seu imóvel. Todos os campos marcados com{" "}
              <span className="text-red-500">*</span> são obrigatórios.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Coluna 1 */}
            <section className="space-y-6 bg-gray-50 rounded-xl p-6 shadow-sm border">
              <div className="flex items-center gap-2 mb-2">
                <Home className="text-green-600" size={22} />
                <h3 className="text-lg font-semibold text-gray-700">Informações Básicas</h3>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Nome do Imóvel <span className="text-red-500">*</span>
                </label>
                <Input
                  name="nomeImovel"
                  value={formData.nomeImovel}
                  onChange={handleChange}
                  placeholder="Apartamento Centro"
                  required
                  className="focus:ring-2 focus:ring-green-400"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Data da Matrícula <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="date"
                    name="dateRegistration"
                    value={formData.dateRegistration}
                    onChange={handleChange}
                    required
                    className="focus:ring-2 focus:ring-green-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Valor da Matrícula <span className="text-red-500">*</span>
                  </label>
                  <NumericFormat
                    customInput={Input}
                    name="valueRegistration"
                    value={formData.valueRegistration}
                    onValueChange={(values) => {
                      setFormData((prev) => ({
                        ...prev,
                        valueRegistration: values.value,
                      }));
                    }}
                    className="focus:ring-2 focus:ring-green-400"
                    prefix="R$ "
                    thousandSeparator="."
                    decimalSeparator=","
                    decimalScale={2}
                    fixedDecimalScale
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Proprietário <span className="text-red-500">*</span>
                </label>
                <select
                  name="ownerId"
                  value={formData.ownerId}
                  onChange={handleChange}
                  className="flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm focus:ring-2 focus:ring-green-400"
                  required
                >
                  <option value="">Selecione um proprietário</option>
                  {owners.map((owner) => (
                    <option key={owner.id} value={owner.id}>
                      {owner.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Telefone</label>
                <Input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  readOnly
                  className="bg-gray-100 text-gray-500"
                  placeholder="Telefone do proprietário"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Status <span className="text-red-500">*</span>
                </label>
                <select
                  name="ativo"
                  value={formData.ativo}
                  onChange={handleChange}
                  className="flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm focus:ring-2 focus:ring-green-400"
                  required
                >
                  <option value="">Selecione o status</option>
                  <option value="true">Ativo</option>
                  <option value="false">Inativo</option>
                </select>
              </div>
            </section>

            {/* Coluna 2 */}
            <section className="space-y-6 bg-gray-50 rounded-xl p-6 shadow-sm border">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="text-green-600" size={22} />
                <h3 className="text-lg font-semibold text-gray-700">Localização e Características</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Rua <span className="text-red-500">*</span>
                  </label>
                  <Input
                    name="street"
                    value={formData.street}
                    onChange={handleChange}
                    required
                    className="focus:ring-2 focus:ring-green-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Número <span className="text-red-500">*</span>
                  </label>
                  <Input
                    name="number"
                    value={formData.number}
                    onChange={handleChange}
                    required
                    className="focus:ring-2 focus:ring-green-400"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Bairro <span className="text-red-500">*</span>
                </label>
                <Input
                  name="neighborhood"
                  value={formData.neighborhood}
                  onChange={handleChange}
                  required
                  className="focus:ring-2 focus:ring-green-400"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Estado <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm focus:ring-2 focus:ring-green-400"
                    required
                  >
                    <option value="">Selecione um estado</option>
                    {estados.map((estado) => (
                      <option key={estado.id} value={estado.id}>
                        {estado.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Cidade <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm focus:ring-2 focus:ring-green-400"
                    required
                  >
                    <option value="">Selecione uma cidade</option>
                    {cidades
                      .filter((cidade) => cidade.nome)
                      .map((cidade) => (
                        <option key={cidade.id} value={cidade.id}>
                          {cidade.nome}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  CEP <span className="text-red-500">*</span>
                </label>
                <PatternFormat
                  customInput={Input}
                  format="#####-###"
                  mask="_"
                  value={formData.cep}
                  onValueChange={(values) => {
                    const newCep = values.value;
                    setFormData((prev) => ({ ...prev, cep: newCep }));
                  }}
                  required
                  className="focus:ring-2 focus:ring-green-400"
                />
              </div>
            </section>
          </div>

          {error && <div className="text-red-500 text-sm text-center">{error}</div>}

          <div className="flex gap-3 justify-end mt-8">
            <Button
              type="submit"
              className="py-2 px-6 text-sm font-semibold rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
            >
              Salvar
            </Button>
            <Button
              type="button"
              onClick={() => setShowModal(false)}
              className="py-2 px-6 text-sm font-semibold rounded-lg bg-red-100 text-red-700 hover:bg-red-600 hover:text-white transition"
            >
              Cancelar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
