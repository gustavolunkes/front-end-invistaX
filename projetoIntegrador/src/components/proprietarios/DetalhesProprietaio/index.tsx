import { OwnerDTOAttributes } from "@/service/route/owner/owner";
import { Button } from "../../ui/button";
import { User, MapPin, Mail, Phone, IdCard, Home, Building } from "lucide-react";

interface DetalhesProprietarioProps {
  proprietario: OwnerDTOAttributes & {
    imoveis?: { id: number; nome: string }[];
  };
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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-4xl shadow-2xl relative max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gray-100 text-gray-800 p-6 rounded-t-2xl relative border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="bg-gray-200 p-3 rounded-full">
              <User size={32} className="text-gray-300" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-800">
                {proprietario.name}
              </h2>
              <p className="text-gray-600">Proprietário</p>
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            {onEdit && (
              <Button
                variant="outline"
                className="bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
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
                variant="outline"
                className="text-red-600 hover:text-red-700 hover:bg-red-100"
                onClick={() => onDelete(proprietario)}
              >
                Excluir
              </Button>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Informações Pessoais */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-gray-100 p-2 rounded-lg">
                  <IdCard className="text-gray-400" size={20} />
                </div>
                <h3 className="font-bold text-lg text-gray-800">
                  Informações Pessoais
                </h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <User className="text-gray-400" size={16} />
                  <span className="text-gray-800">Nome:</span>
                  <span className="font-semibold text-black">
                    {proprietario.name}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <IdCard className="text-gray-400" size={16} />
                  <span className="text-gray-800">CPF/CNPJ:</span>
                  <span className="font-semibold text-black">
                    {proprietario.cpf_cnpj}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="text-gray-400" size={16} />
                  <span className="text-gray-800">Telefone:</span>
                  <span className="font-semibold text-black">
                    {proprietario.phone}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="text-gray-400" size={16} />
                  <span className="text-gray-800">E-mail:</span>
                  <span className="font-semibold text-black">
                    {proprietario.email}
                  </span>
                </div>
              </div>
            </div>

            {/* Endereço */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-gray-100 p-2 rounded-lg">
                  <MapPin className="text-gray-400" size={20} />
                </div>
                <h3 className="font-bold text-lg text-gray-800">Endereço</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <Building className="text-gray-400 mt-0.5" size={16} />
                  <div>
                    <span className="text-gray-800 block">
                      Endereço completo:
                    </span>
                    <span className="font-semibold text-black">
                      {proprietario.street}, {proprietario.number}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="text-gray-400" size={16} />
                  <span className="text-gray-800">Bairro:</span>
                  <span className="font-semibold text-black">
                    {proprietario.neighborhood}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="text-gray-400" size={16} />
                  <span className="text-gray-800">CEP:</span>
                  <span className="font-semibold text-black">
                    {String(proprietario.cep).replace(/^(\d{5})(\d{3})$/, "$1-$2")}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="text-gray-400" size={16} />
                  <span className="text-gray-800">Cidade ID:</span>
                  <span className="font-semibold text-black">
                    {proprietario.cityId}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Imóveis */}
          <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-gray-100 p-2 rounded-lg">
                <Home className="text-gray-400" size={22} />
              </div>
              <h3 className="font-bold text-xl text-gray-800">
                Imóveis do Proprietário
              </h3>
              {proprietario.imoveis && (
                <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-sm font-medium">
                  {proprietario.imoveis.length} imóvel(is)
                </span>
              )}
            </div>
            {proprietario.imoveis && proprietario.imoveis.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {proprietario.imoveis.map((imovel) => (
                  <div
                    key={imovel.id}
                    className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-all hover:border-gray-300"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-gray-100 p-2 rounded-lg">
                        <Home className="text-gray-400" size={20} />
                      </div>
                      <div>
                        <span className="font-semibold text-black">
                          {imovel.nome}
                        </span>
                        <p className="text-sm text-gray-800">ID: {imovel.id}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Home className="text-gray-400 mx-auto mb-2" size={48} />
                <span className="text-gray-800 font-medium">
                  Nenhum imóvel cadastrado
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 rounded-b-2xl flex justify-end border-t border-gray-200">
          <Button variant="outline" onClick={onClose} className="px-6">
            Fechar
          </Button>
        </div>
      </div>
    </div>
  );
}