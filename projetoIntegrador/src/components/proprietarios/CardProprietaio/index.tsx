import { OwnerDTOAttributes } from "@/service/route/owner/owner";
import { Button } from "../../ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface ProprietarioCardProps {
  proprietario: OwnerDTOAttributes;
  onEdit?: (proprietario: OwnerDTOAttributes) => void;
  onDelete?: (proprietario: OwnerDTOAttributes) => void;
}

export const ProprietarioCard = ({
  proprietario,
  onEdit,
  onDelete,
}: ProprietarioCardProps) => {
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="border rounded-xl p-4 shadow-sm w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">{proprietario.name}</h2>
          <p className="text-gray-500">CPF/CNPJ: {proprietario.cpf_cnpj}</p>
          <p className="text-gray-500">Telefone: {proprietario.phone}</p>
          <p className="text-gray-500">E-mail: {proprietario.email}</p>
          <p className="text-gray-500">
            Endereço: {proprietario.street}, {proprietario.number} -{" "}
            {proprietario.neighborhood}
          </p>
          <p className="text-gray-500">
            CEP: {String(proprietario.cep).replace(/^(\d{5})(\d{3})$/, "$1-$2")}
          </p>
        </div>

        <div className="flex flex-col gap-3 justify-between">
          <Button
            variant="outline"
            className="w-full hover:bg-gray-100"
            onClick={() => navigate(`/proprietarios/${proprietario.id ?? ""}`)}
          >
            Ver detalhes
          </Button>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex-1 flex gap-2 items-center hover:bg-gray-100"
              onClick={() => onEdit && onEdit(proprietario)}
            >
              <Pencil size={16} /> Editar
            </Button>
            <Button
              variant="outline"
              className="flex-1 flex gap-2 items-center text-red-600 hover:text-red-700 hover:bg-red-100"
              onClick={() => setShowConfirm(true)}
            >
              <Trash2 size={16} /> Excluir
            </Button>
          </div>
        </div>
      </div>

      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm flex flex-col items-center">
            <p className="mb-4 text-center text-lg font-semibold">
              Tem certeza que deseja excluir este proprietário?
            </p>
            <div className="flex gap-4">
              <Button
                variant="destructive"
                className="bg-red-600 text-white"
                onClick={() => {
                  setShowConfirm(false);
                  onDelete && onDelete(proprietario);
                }}
              >
                Sim, excluir
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowConfirm(false)}
              >
                Cancelar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};