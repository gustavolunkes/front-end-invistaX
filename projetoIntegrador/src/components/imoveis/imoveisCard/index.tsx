import { ImovelAttributes } from "@/service/route/imovel/imovel";
import { Button } from "../../../components/ui/button";
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
        <Button
          variant="outline"
          className=" hover:bg-gray-100 flex justify-center items-center w-6/12"
          onClick={() => navigate(`/imoveis/${imovel.id_imovel}`)}
        >
          Ver detalhes
        </Button>
      </div>
    </div>
  );
};
