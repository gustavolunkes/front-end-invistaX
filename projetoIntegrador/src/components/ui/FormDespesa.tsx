import { useState, useEffect } from "react";
import { Button } from "./button";
import { Input } from "./input";
import { Calendar, DollarSign, FileText, Home } from "lucide-react";

// Tipagem da despesa
export interface Despesa {
  id?: number;
  descricao: string;
  valor: number;
  data: string;
  categoria: string;
  imovel?: string;
}

interface Props {
  setShowModal: (show: boolean) => void;
  despesaParaEditar?: Despesa | null;
  onSave?: (despesa: Despesa) => void;
}

const initialFormData: Despesa = {
  descricao: "",
  valor: 0,
  data: "",
  categoria: "",
  imovel: "",
};

export function FormDespesa({ setShowModal, despesaParaEditar, onSave }: Props) {
  const [formData, setFormData] = useState<Despesa>(initialFormData);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (despesaParaEditar) {
      setFormData(despesaParaEditar);
    } else {
      setFormData(initialFormData);
    }
  }, [despesaParaEditar]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "valor" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.descricao || !formData.valor || !formData.data) {
      setError("Preencha todos os campos obrigatórios.");
      return;
    }
    setError(null);
    if (onSave) onSave(formData);
    setShowModal(false);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-2xl w-full max-w-2xl shadow-2xl border border-gray-100">
        <form onSubmit={handleSubmit} className="space-y-8">
          <header className="mb-2 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-1">
              {despesaParaEditar ? "Editar Despesa" : "Nova Despesa"}
            </h2>
            <p className="text-gray-500 text-sm">
              Preencha os detalhes da despesa. Todos os campos marcados com{" "}
              <span className="text-red-500">*</span> são obrigatórios.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Coluna 1 */}
            <section className="space-y-6 bg-gray-50 rounded-xl p-6 shadow-sm border">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="text-red-600" size={22} />
                <h3 className="text-lg font-semibold text-gray-700">Informações da Despesa</h3>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Descrição <span className="text-red-500">*</span>
                </label>
                <Input
                  name="descricao"
                  value={formData.descricao}
                  onChange={handleChange}
                  placeholder="Ex: Conta de luz"
                  required
                  className="focus:ring-2 focus:ring-red-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Valor (R$) <span className="text-red-500">*</span>
                </label>
                <Input
                  name="valor"
                  type="number"
                  value={formData.valor}
                  onChange={handleChange}
                  placeholder="Ex: 250"
                  required
                  className="focus:ring-2 focus:ring-red-400"
                  min={0}
                  step={0.01}
                />
              </div>
            </section>

            {/* Coluna 2 */}
            <section className="space-y-6 bg-gray-50 rounded-xl p-6 shadow-sm border">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="text-red-600" size={22} />
                <h3 className="text-lg font-semibold text-gray-700">Detalhes</h3>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Data <span className="text-red-500">*</span>
                </label>
                <Input
                  name="data"
                  type="date"
                  value={formData.data}
                  onChange={handleChange}
                  required
                  className="focus:ring-2 focus:ring-red-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Categoria
                </label>
                <Input
                  name="categoria"
                  value={formData.categoria}
                  onChange={handleChange}
                  placeholder="Ex: Impostos, Manutenção"
                  className="focus:ring-2 focus:ring-red-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Imóvel
                </label>
                <Input
                  name="imovel"
                  value={formData.imovel}
                  onChange={handleChange}
                  placeholder="Ex: Apartamento Centro"
                  className="focus:ring-2 focus:ring-red-400"
                />
              </div>
            </section>
          </div>

          {error && <div className="text-red-500 text-sm text-center">{error}</div>}

          <div className="flex gap-3 justify-end mt-8">
            <Button
              type="submit"
              className="py-2 px-6 text-sm font-semibold rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
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