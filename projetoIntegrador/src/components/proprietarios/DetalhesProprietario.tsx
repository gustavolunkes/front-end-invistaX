import { OwnerDTOAttributes } from "@/service/route/owner/owner";
import { Button } from "../ui/button";
import { X, User, MapPin, Mail, Phone, IdCard } from "lucide-react";

interface DetalhesProprietarioProps {
  proprietario: OwnerDTOAttributes;
  onClose: () => void;
  onEdit?: (proprietario: OwnerDTOAttributes) => void;
  onDelete?: (proprietario: OwnerDTOAttributes) => void;
}

export function DetalhesProprietario({
  proprietario,
  onClose,
  onEdit,
  onDelete,
}: DetalhesProprietarioProps) {
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-2xl w-full max-w-3xl shadow-lg relative">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          onClick={onClose}
        >
          <X size={28} />
        </button>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold flex items-center gap-2">
            <User className="text-red-600" size={32} />
            Detalhes do Proprietário
          </h2>
          <div className="flex gap-2">
            {onEdit && (
              <Button
                variant="outline"
                onClick={() => {
                  onClose();
                  onEdit(proprietario);
                }}
              >
                Editar
              </Button>
            )}
            {onDelete && (
              <Button
                variant="destructive"
                onClick={() => onDelete(proprietario)}
              >
                Excluir
              </Button>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Coluna 1 */}
          <div className="bg-gray-50 rounded-xl p-6 border flex flex-col gap-3">
            <div className="flex items-center gap-2 mb-2">
              <IdCard className="text-red-600" size={20} />
              <h3 className="font-semibold text-lg">Informações Pessoais</h3>
            </div>
            <div>
              <span className="text-gray-500">Nome:</span>
              <span className="font-bold ml-1">{proprietario.name}</span>
            </div>
            <div>
              <span className="text-gray-500">CPF/CNPJ:</span>
              <span className="font-bold ml-1">{proprietario.cpf_cnpj}</span>
            </div>
            <div className="flex items-center gap-1">
              <Phone className="text-gray-400" size={16} />
              <span className="text-gray-500">Telefone:</span>
              <span className="font-bold ml-1">{proprietario.phone}</span>
            </div>
            <div className="flex items-center gap-1">
              <Mail className="text-gray-400" size={16} />
              <span className="text-gray-500">E-mail:</span>
              <span className="font-bold ml-1">{proprietario.email}</span>
            </div>
          </div>
          {/* Coluna 2 */}
          <div className="bg-gray-50 rounded-xl p-6 border flex flex-col gap-3">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="text-red-600" size={20} />
              <h3 className="font-semibold text-lg">Endereço</h3>
            </div>
            <div>
              <span className="text-gray-500">Rua:</span>
              <span className="font-bold ml-1">{proprietario.street}</span>
            </div>
            <div>
              <span className="text-gray-500">Número:</span>
              <span className="font-bold ml-1">{proprietario.number}</span>
            </div>
            <div>
              <span className="text-gray-500">Bairro:</span>
              <span className="font-bold ml-1">{proprietario.neighborhood}</span>
            </div>
            <div>
              <span className="text-gray-500">CEP:</span>
              <span className="font-bold ml-1">
                {String(proprietario.cep).replace(/^(\d{5})(\d{3})$/, "$1-$2")}
              </span>
            </div>
            <div>
              <span className="text-gray-500">Cidade ID:</span>
              <span className="font-bold ml-1">{proprietario.cityId}</span>
            </div>
            <div>
              <span className="text-gray-500 font-semibold block mt-4 mb-2">
                Imóveis do Proprietário:
              </span>
              {proprietario.imoveis && proprietario.imoveis.length > 0 ? (
                <ul className="list-disc list-inside">
                  {proprietario.imoveis.map((imovel) => (
                    <li key={imovel.id} className="font-bold">
                      {imovel.nome}
                    </li>
                  ))}
                </ul>
              ) : (
                <span className="text-gray-400">Nenhum imóvel cadastrado.</span>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-8">
          <Button variant="outline" onClick={onClose}>
            Voltar
          </Button>
        </div>
      </div>
    </div>
  );
}