import { useState, useEffect, useContext } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Search, Plus } from "lucide-react";
import { ImovelForm } from "../components/imoveis/imovelForm/index";
import { ImovelCard } from "../components/imoveis/imoveisCard";
import {
  ImovelAttributes,
  ImovelDTOAttributes,
} from "@/service/route/imovel/imovel";
import { Api } from "@/service/api";
import { AuthContext } from "@/contexts/AuthContexts";
import { PageLayout } from "../components/layout/PageLayout";

export default function Imoveis() {
  const { user } = useContext(AuthContext);
  const api = new Api();
  const [busca, setBusca] = useState("");
  const [imoveis, setImoveis] = useState<ImovelAttributes[]>([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const getImoveis = async () => {
      const response = await api.imovel.getAll(user);
      setImoveis(response);
    };
    getImoveis();
  }, []);

  const imoveisFiltrados = imoveis.filter((imovel) => {
    const buscaMatch = imovel.nome_imovel
      .toLowerCase()
      .includes(busca.toLowerCase());
    return buscaMatch;
  });

  return (
    <PageLayout
      title="Imóveis"
      rightContent={
        <Button
          className="bg-green-600 hover:bg-green-700 cursor-pointer text-white flex items-center gap-2"
          onClick={() => setShowModal(true)}
        >
          <Plus size={20} />
          Adicionar Imóvel
        </Button>
      }
    >
      {showModal && (
        <ImovelForm
          setShowModal={setShowModal}
          setImoveis={setImoveis}
          imoveis={imoveis}
        />
      )}

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative w-full sm:w-1/3">
          <Search className="absolute left-3 top-2.5 text-gray-500" size={18} />
          <Input
            className="pl-10 w-full"
            placeholder="Buscar imóveis..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-6">
        {imoveisFiltrados.map((imovel) => (
          <ImovelCard key={imovel.nome_imovel} imovel={imovel} />
        ))}
      </div>
    </PageLayout>
  );
}
