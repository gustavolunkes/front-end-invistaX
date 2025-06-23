import { useState, useEffect } from "react";
import { Button } from "./button";
import { Input } from "./input";
import { Calendar, DollarSign } from "lucide-react";

// Tipagem da receita
export interface Receita {
  id?: number;
  titulo: string;
  descricao: string;
  valor: number;
  data: string;
}

interface FormReceitaProps {
  setShowModal: (show: boolean) => void;
  receitaParaEditar?: Receita | null;
  onSave?: (receita: Receita) => void;
}

const initialFormData: Receita = {
  titulo: "",
  descricao: "",
  valor: 0,
  data: "",
};

export function FormReceita({
  setShowModal,
  receitaParaEditar,
  onSave,
}: FormReceitaProps) {
  const [formData, setFormData] = useState<Receita>(initialFormData);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (receitaParaEditar) {
      setFormData(receitaParaEditar);
    } else {
      setFormData(initialFormData);
    }
  }, [receitaParaEditar]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "valor" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.titulo || !formData.valor || !formData.data) {
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
              {receitaParaEditar ? "Editar Receita" : "Nova Receita"}
            </h2>
            <p className="text-gray-500 text-sm">
              Preencha os detalhes da receita. Todos os campos marcados com{" "}
              <span className="text-red-500">*</span> são obrigatórios.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Coluna 1 */}
            <section className="space-y-6 bg-gray-50 rounded-xl p-6 shadow-sm border">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="text-green-600" size={22} />
                <h3 className="text-lg font-semibold text-gray-700">
                  Informações da Receita
                </h3>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Título <span className="text-red-500">*</span>
                </label>
                <Input
                  name="titulo"
                  value={formData.titulo}
                  onChange={handleChange}
                  placeholder="Ex: Aluguel"
                  required
                  className="focus:ring-2 focus:ring-green-400"
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
                  placeholder="Ex: 1200"
                  required
                  className="focus:ring-2 focus:ring-green-400"
                  min={0}
                  step={0.01}
                />
              </div>
            </section>

            {/* Coluna 2 */}
            <section className="space-y-6 bg-gray-50 rounded-xl p-6 shadow-sm border">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="text-green-600" size={22} />
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
                  className="focus:ring-2 focus:ring-green-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Descrição</label>
                <textarea
                  name="descricao"
                  value={formData.descricao}
                  onChange={handleChange}
                  placeholder="Ex: Aluguel referente ao mês de junho"
                  className="border rounded px-3 py-2 w-full focus:ring-2 focus:ring-green-400 min-h-[80px]"
                />
              </div>
            </section>
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}

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
              className="py-2 px-6 text-sm font-semibold rounded-lg bg-zinc-700 text-white hover:bg-zinc-600 transition"
            >
              Cancelar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
