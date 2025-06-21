import { useState, useEffect, useContext } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Search, Plus } from "lucide-react";
import { FormProprietario } from "../components/proprietarios/FormProprietario";
import { ProprietarioCard } from "../components/proprietarios/ProprietarioCard";
import { OwnerDTOAttributes } from "@/service/route/owner/owner";
import { Api } from "@/service/api";
import { AuthContext } from "@/contexts/AuthContexts";
import { DetalhesProprietario } from "../components/proprietarios/DetalhesProprietario";

export default function Proprietarios() {
  const { user } = useContext(AuthContext);
  const api = new Api();
  const [busca, setBusca] = useState("");
  const [proprietarios, setProprietarios] = useState<OwnerDTOAttributes[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [proprietarioParaEditar, setProprietarioParaEditar] =
    useState<OwnerDTOAttributes | null>(null);
  const [showDetalhes, setShowDetalhes] = useState(false);
  const [proprietarioSelecionado, setProprietarioSelecionado] =
    useState<OwnerDTOAttributes | null>(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [proprietarioParaExcluir, setProprietarioParaExcluir] = useState<OwnerDTOAttributes | null>(null);

  useEffect(() => {
    const getProprietarios = async () => {
      const response = await api.owner.getByOwner(Number(user));
      // Adapte os campos do OwnerAttributes para OwnerDTOAttributes
      const adaptado = Array.isArray(response)
        ? response.map((item) => ({
            id: item.id,
            name: item.name,
            cpf_cnpj: String(item.cpf_cnpj),
            phone: String(item.phone),
            email: item.email,
            street: item.address?.street ?? "",
            number: item.address?.number ?? 0,
            neighborhood: item.address?.neighborhood ?? "",
            cep: item.address?.cep ?? 0,
            userId: String(item.user?.id ?? ""),
            cityId: item.address?.cityId ?? 0,
          }))
        : [{
            id: response.id,
            name: response.name,
            cpf_cnpj: String(response.cpf_cnpj),
            phone: String(response.phone),
            email: response.email,
            street: response.address?.street ?? "",
            number: response.address?.number ?? 0,
            neighborhood: response.address?.neighborhood ?? "",
            cep: response.address?.cep ?? 0,
            userId: String(response.user?.id ?? ""),
            cityId: response.address?.city?.id ?? 0,
          }];
      setProprietarios(adaptado);
    };
    getProprietarios();
  }, [user]);

  const proprietariosFiltrados = proprietarios.filter((proprietario) => {
    const buscaMatch = proprietario.name
      .toLowerCase()
      .includes(busca.toLowerCase());
    return buscaMatch;
  });

  const handleEditar = (proprietario: OwnerDTOAttributes) => {
    setProprietarioParaEditar(proprietario);
    setShowEditForm(true);
  };

  const handleExcluir = async (id: number) => {
    if (confirm("Tem certeza que deseja excluir este proprietário?")) {
      await api.owner.deleteByOwner(id);
      setProprietarios(proprietarios.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="flex flex-col gap-6 p-6 mx-auto w-full max-h-screen overflow-y-auto">
      {showModal && (
        <FormProprietario
          setShowModal={setShowModal}
          onSave={(dadosEditados) => {
            setShowModal(false);
          }}
        />
      )}
      {showEditForm && proprietarioParaEditar && (
        <FormProprietario
          setShowModal={setShowEditForm}
          proprietarioParaEditar={proprietarioParaEditar}
          onSave={(dadosEditados) => {
            setShowEditForm(false);
          }}
        />
      )}
      {showDetalhes && proprietarioSelecionado && (
        <DetalhesProprietario
          proprietario={proprietarioSelecionado}
          onClose={() => setShowDetalhes(false)}
          onEdit={(p) => {
            setShowDetalhes(false);
            handleEditar(p);
          }}
          onDelete={(p) => {
            setShowDetalhes(false);
            setProprietarioParaExcluir(p);
            setShowConfirmDelete(true);
          }}
        />
      )}
      {/* Modal de confirmação de exclusão */}
      {showConfirmDelete && proprietarioParaExcluir && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm flex flex-col items-center">
            <p className="mb-4 text-center text-lg font-semibold">
              Tem certeza que deseja excluir este proprietário?
            </p>
            <div className="flex gap-4">
              <Button
                variant="destructive"
                className="bg-red-600 text-white"
                onClick={async () => {
                  await handleExcluir(proprietarioParaExcluir.id);
                  setShowConfirmDelete(false);
                  setProprietarioParaExcluir(null);
                }}
              >
                Sim, excluir
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShowConfirmDelete(false);
                  setProprietarioParaExcluir(null);
                }}
              >
                Cancelar
              </Button>
            </div>
          </div>
        </div>
      )}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Proprietários</h1>
        <Button
          className="bg-green-600 hover:bg-green-700 cursor-pointer text-white"
          onClick={() => setShowModal(true)}
        >
          <Plus size={24} />
          Adicionar Proprietário
        </Button>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative w-full sm:w-1/3">
          <Search className="absolute left-3 top-2.5 text-gray-500" size={18} />
          <Input
            className="pl-10 w-full"
            placeholder="Buscar proprietários..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
        </div>
      </div>
      <div className="space-y-6 mt-6">
        <h2 className="text-2xl font-bold">Lista de Proprietários</h2>
        <div className="bg-white rounded-xl shadow p-4">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-3 font-semibold text-gray-500">Nome</th>
                <th className="text-left p-3 font-semibold text-gray-500">CPF/CNPJ</th>
                <th className="text-left p-3 font-semibold text-gray-500">Telefone</th>
                <th className="text-left p-3 font-semibold text-gray-500">E-mail</th>
                <th className="text-left p-3 font-semibold text-gray-500">Ações</th>
              </tr>
            </thead>
            <tbody>
              {/* Exemplo fixo */}
              <tr className="border-b bg-gray-50">
                <td className="p-3 font-semibold">Maria Oliveira</td>
                <td className="p-3">987.654.321-00</td>
                <td className="p-3">(21) 99876-5432</td>
                <td className="p-3">maria.oliveira@email.com</td>
                <td className="p-3">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setProprietarioSelecionado({
                        id: 999,
                        name: "Maria Oliveira",
                        cpf_cnpj: "987.654.321-00",
                        phone: "(21) 99876-5432",
                        email: "maria.oliveira@email.com",
                        street: "Av. Brasil",
                        number: 456,
                        neighborhood: "Copacabana",
                        cep: 22000000,
                        userId: "1",
                        cityId: 1,
                      });
                      setShowDetalhes(true);
                    }}
                  >
                    Ver detalhes
                  </Button>
                </td>
              </tr>
              {/* Lista real */}
              {proprietariosFiltrados.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center text-gray-500 py-6">
                    Nenhum proprietário encontrado.
                  </td>
                </tr>
              )}
              {proprietariosFiltrados.map((proprietario) => (
                <tr key={proprietario.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{proprietario.name}</td>
                  <td className="p-3">{proprietario.cpf_cnpj}</td>
                  <td className="p-3">{proprietario.phone}</td>
                  <td className="p-3">{proprietario.email}</td>
                  <td className="p-3">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setProprietarioSelecionado(proprietario);
                        setShowDetalhes(true);
                      }}
                    >
                      Ver detalhes
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}