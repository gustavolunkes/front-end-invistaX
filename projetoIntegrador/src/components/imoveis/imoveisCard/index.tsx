import { ImovelAttributes } from "@/service/route/imovel/imovel";
import { Button } from "../../../components/ui/button";
import { Pencil, Tag, Trash2, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const ImovelCard = ({ imovel }: { imovel: ImovelAttributes }) => {
  const formatarMoeda = (valor: number) =>
    valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  const navigate = useNavigate();
  return (
    <div
      key={imovel.id_imovel}
      className="border rounded-xl p-4 shadow-sm w-full"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">{imovel.nome_imovel}</h2>
          <p className="text-gray-600">{imovel.adress.toElegant()}</p>
        </div>

        <div className="space-y-2 flex justify-center">
          <div>
            <p className="text-gray-500">Valor da compra</p>
            <p className="font-semibold">
              {formatarMoeda(imovel.valueRegistration)}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 justify-between">
          <Button
            variant="outline"
            className="w-full hover:bg-gray-100"
            onClick={() => navigate(`/imoveis/${imovel.id_imovel}`)}
          >
            Ver detalhes
          </Button>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex-1 flex gap-2 items-center hover:bg-gray-100"
            >
              <Pencil size={16} /> Editar
            </Button>
            <Button
              variant="outline"
              className="flex-1 flex gap-2 items-center text-red-600 hover:text-red-700 hover:bg-red-100"
            >
              <Trash2 size={16} /> Excluir
            </Button>
          </div>
          <Button
            variant="outline"
            className="w-full flex gap-2 items-center hover:bg-gray-100"
          >
            <Tag size={16} /> Liquidar
          </Button>
        </div>
      </div>
    </div>
  );
};
