import { useState } from "react";
import { Button } from "../../ui/button";
import { Calendar, DollarSign, FileText, Home } from "lucide-react";

interface Receita {
  descricao: string;
  valor: number;
  data: string;
  categoria: string;
  imovel?: string;
}

interface ReceitaDetalhadaProps {
  receita: Receita;
  onVoltar: () => void;
  onEditar?: () => void;
  onExcluir?: () => void;
}

export function ReceitaDetalhada({
  receita,
  onVoltar,
  onEditar,
  onExcluir,
}: ReceitaDetalhadaProps) {
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const handleExcluirClick = () => {
    setShowConfirmDelete(true);
  };

  const handleConfirmDelete = () => {
    setShowConfirmDelete(false);
    onExcluir?.();
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-2xl w-full max-w-2xl shadow-2xl border border-gray-100">
          <header className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <FileText className="text-green-600" size={28} />
              Detalhes da Receita
            </h1>
            <div className="flex gap-2">
              {onEditar && (
                <Button variant="outline" onClick={onEditar}>
                  Editar
                </Button>
              )}
              {onExcluir && (
                <Button
                  variant="outline"
                  className="text-red-600 hover:text-red-700 hover:bg-red-100"
                  onClick={handleExcluirClick}
                >
                  Excluir
                </Button>
              )}
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <section className="space-y-6 bg-gray-50 rounded-xl p-6 shadow-sm border">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="text-green-600" size={22} />
                <h3 className="text-lg font-semibold text-gray-700">
                  Informações
                </h3>
              </div>
              <div>
                <p className="text-gray-500">Descrição</p>
                <p className="font-semibold">{receita.descricao}</p>
              </div>
              <div>
                <p className="text-gray-500">Valor</p>
                <p className="font-semibold text-green-600">
                  {receita.valor.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Categoria</p>
                <p className="font-semibold">{receita.categoria}</p>
              </div>
            </section>
            <section className="space-y-6 bg-gray-50 rounded-xl p-6 shadow-sm border">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="text-green-600" size={22} />
                <h3 className="text-lg font-semibold text-gray-700">Detalhes</h3>
              </div>
              <div>
                <p className="text-gray-500">Data</p>
                <p className="font-semibold">
                  {receita.data
                    ? new Date(receita.data).toLocaleDateString("pt-BR")
                    : "-"}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Imóvel</p>
                <p className="font-semibold">{receita.imovel || "-"}</p>
              </div>
            </section>
          </div>

          <div className="flex justify-end mt-8">
            <Button variant="outline" onClick={onVoltar}>
              Voltar
            </Button>
          </div>
        </div>
      </div>

      {/* Modal de confirmação de exclusão */}
      {showConfirmDelete && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-60">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm flex flex-col items-center">
            <p className="mb-4 text-center text-lg font-semibold">
              Tem certeza que deseja excluir esta receita?
            </p>
            <div className="flex gap-4">
              <Button
                variant="destructive"
                className="bg-red-600 text-white"
                onClick={handleConfirmDelete}
              >
                Sim
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowConfirmDelete(false)}
              >
                Cancelar
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}