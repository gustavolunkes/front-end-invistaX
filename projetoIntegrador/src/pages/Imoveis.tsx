import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Search, Pencil, Trash2, Tag, Check, X } from "lucide-react";
import { FormImovel } from "../components/ui/FormImovel";

// Mock de imóveis para exemplo
const mockImoveis: Imovel[] = [
  {
    id: 1,
    nome: "Apartamento Centro",
    endereco: "Rua das Flores, 123",
    valorCompra: 350000,
    valorAtual: 400000,
    aluguelMensal: 2000,
    status: "alugado", // deve ser exatamente "alugado"
  },
  {
    id: 2,
    nome: "Casa Jardim",
    endereco: "Av. Brasil, 456",
    valorCompra: 500000,
    valorAtual: 550000,
    aluguelMensal: 2500,
    status: "vago", // deve ser exatamente "vago"
  },
];

// Mock de filtros
const filtros = [
  { valor: "todos", label: "Todos" },
  { valor: "alugados", label: "Alugados" },
  { valor: "vagos", label: "Vagos" },
];

// Mock da API
const Api = {
  delete: async (url: string) => {
    // Simula exclusão
    return new Promise((resolve) => setTimeout(resolve, 500));
  },
};

interface Imovel {
  id: number;
  nome: string;
  endereco: string;
  valorCompra: number;
  valorAtual: number;
  aluguelMensal: number;
  status: "alugado" | "vago";
}

export function ImovelCrud() {
  const [loading, setLoading] = useState(false);
  const [busca, setBusca] = useState("");
  const [filtro, setFiltro] = useState<"todos" | "alugados" | "vagos">("todos");
  const [imoveis, setImoveis] = useState<Imovel[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [imovelSelecionado, setImovelSelecionado] = useState<Imovel | null>(null);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [imovelParaExcluir, setImovelParaExcluir] = useState<Imovel | null>(null);
  const [loadingExcluir, setLoadingExcluir] = useState(false);
  const [imovelParaEditar, setImovelParaEditar] = useState<Imovel | null>(null);
  const [showConfirmEdit, setShowConfirmEdit] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showConfirmLogout, setShowConfirmLogout] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    carregarImoveis();
  }, []);

  function carregarImoveis() {
    setImoveis(mockImoveis);
  }

  const imoveisFiltrados = imoveis.filter((imovel) => {
    const buscaMatch =
      imovel.nome.toLowerCase().includes(busca.toLowerCase()) ||
      imovel.endereco.toLowerCase().includes(busca.toLowerCase());
    const filtroMatch =
      filtro === "todos" ||
      (filtro === "alugados" && imovel.status === "alugado") ||
      (filtro === "vagos" && imovel.status === "vago");
    return buscaMatch && filtroMatch;
  });

  const formatarMoeda = (valor: number) =>
    valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  async function deletarImovel(id: number) {
    try {
      await Api.delete(`/imovel/${id}`);
      carregarImoveis();
    } catch (error) {
      console.error("Erro ao deletar imóvel:", error);
    }
  }

  // Quando clicar em editar:
  function onEdit(imovel: Imovel) {
    setImovelParaEditar(imovel);
    setShowConfirmEdit(true);
  }

  // Quando confirmar no modal:
  function confirmarEdicao() {
    setShowConfirmEdit(false);
    setShowEditForm(true);
  }

  function onAdd() {
    setImovelSelecionado(null);
    setModoEdicao(false);
    setShowModal(true);
  }

  function onDeleteClick(imovel: Imovel) {
    setImovelParaExcluir(imovel);
  }

  async function confirmarExclusao() {
    if (!imovelParaExcluir?.id) return;
    setLoadingExcluir(true);
    try {
      await deletarImovel(imovelParaExcluir.id);
      setImovelParaExcluir(null);
      carregarImoveis();
    } catch (error) {
      // Trate o erro se quiser
    } finally {
      setLoadingExcluir(false);
    }
  }

  function mapImovelToForm(imovel: Imovel) {
    return {
      nomeImovel: imovel.nome,
      dateRegistration: "", // preencha se tiver esse dado
      valueRegistration: imovel.valorCompra.toString(),
      ownerId: "",
      phone: "",
      ativo: imovel.status === "alugado" ? "true" : "false",
      street: imovel.endereco, // ajuste se endereço for separado
      number: "",
      neighborhood: "",
      state: "",
      city: "",
      cep: "",
    };
  }

  function mapFormToImovel(form: any, id: number): Imovel {
    return {
      id,
      nome: form.nomeImovel,
      endereco: form.street, // ajuste se necessário
      valorCompra: Number(form.valueRegistration),
      valorAtual: Number(form.valueRegistration), // ajuste se tiver campo separado
      aluguelMensal: 0, // ajuste se tiver campo
      status: form.ativo === "true" ? "alugado" : "vago",
    };
  }

  return (
    <div className="flex flex-col gap-6 p-6 max-w-6xl mx-auto w-full">
      {/* Modal do formulário de imóvel */}
      {showModal && <FormImovel setShowModal={setShowModal} />}

      {/* Modal de confirmação de exclusão */}
      {imovelParaExcluir && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-bold mb-4">Excluir imóvel</h2>
            <p>
              Tem certeza que deseja excluir{" "}
              <b>{imovelParaExcluir.nome}</b>?
            </p>
            <div className="flex gap-2 mt-6">
              <Button
                variant="outline"
                onClick={() => setImovelParaExcluir(null)}
                disabled={loadingExcluir}
              >
                Cancelar
              </Button>
              <Button
                className="bg-red-600 text-white hover:bg-red-700"
                onClick={confirmarExclusao}
                disabled={loadingExcluir}
              >
                {loadingExcluir ? "Excluindo..." : "Excluir"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de confirmação de edição */}
      {showConfirmEdit && imovelParaEditar && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-bold mb-4">Editar imóvel</h2>
            <p>
              Tem certeza que deseja editar <b>{imovelParaEditar.nome}</b>?
            </p>
            <div className="flex gap-2 mt-6">
              <Button variant="outline" onClick={() => setShowConfirmEdit(false)}>
                Cancelar
              </Button>
              <Button className="bg-green-600 text-white hover:bg-green-700" onClick={confirmarEdicao}>
                Confirmar
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de confirmação de logout */}
      {showConfirmLogout && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-bold mb-4">Sair</h2>
            <p>Tem certeza que deseja sair?</p>
            <div className="flex gap-2 mt-6">
              <Button
                variant="outline"
                onClick={() => setShowConfirmLogout(false)}
              >
                Cancelar
              </Button>
              <Button
                className="bg-red-600 text-white hover:bg-red-700"
                onClick={() => {
                  // Aqui você pode redirecionar, limpar auth, etc.
                  window.location.href = "/login"; // Exemplo: redireciona para login
                }}
              >
                Sair
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Cabeçalho */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Imóveis</h1>
        <Button
          className="bg-green-600 hover:bg-green-700 cursor-pointer"
          onClick={onAdd}
        >
          + Adicionar Imóvel
        </Button>
      </div>

      {/* Campo de busca com ícone */}
      <div className="flex items-center gap-2 w-full max-w-xs mb-4">
        <span className="text-zinc-400">
          <Search size={20} />
        </span>
        <Input
          type="text"
          placeholder="Buscar imóvel..."
          value={busca}
          onChange={e => setBusca(e.target.value)}
          className="w-full"
        />
      </div>

      {/* Cartões de imóveis */}
      <div className="space-y-4">
        {imoveisFiltrados.map((imovel) => (
          <div
            key={imovel.id}
            className="border border-zinc-200 bg-white rounded-lg p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 transition hover:shadow"
          >
            {/* Imagem do imóvel */}
            <div className="w-full md:w-32 h-32 bg-zinc-100 rounded-lg flex-shrink-0 overflow-hidden flex items-center justify-center">
              {/* Substitua o src pelo campo da imagem do seu imóvel, se houver */}
              <img
                src={imovel.imagemUrl || "https://via.placeholder.com/128x128?text=Imóvel"}
                alt={imovel.nome}
                className="object-cover w-full h-full"
              />
            </div>
            {/* Informações do imóvel */}
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <div className="font-semibold text-lg">{imovel.nome}</div>
                <div className="text-zinc-500 text-sm">{imovel.endereco}</div>
                <div className="text-green-700 text-base font-bold mt-1">
                  {formatarMoeda(imovel.valorAtual)}
                </div>
              </div>
            </div>
            {/* Botões de ação */}
            <div className="flex flex-col items-start gap-2 mt-2 md:mt-0">
              <Button
                variant="ghost"
                size="icon"
                className="text-zinc-500 hover:text-green-600"
                onClick={() => navigate(`/detalhesimovel/${imovel.id}`)}
                title="Ver detalhes"
              >
                <Search size={18} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-zinc-500 hover:text-blue-600"
                onClick={() => onEdit(imovel)}
                title="Editar"
              >
                <Pencil size={18} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-zinc-500 hover:text-red-600"
                onClick={() => onDeleteClick(imovel)}
                title="Excluir"
              >
                <Trash2 size={18} />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Formulário de edição de imóvel */}
      {showEditForm && imovelParaEditar && (
        <FormImovel
          setShowModal={setShowEditForm}
          imovelParaEditar={mapImovelToForm(imovelParaEditar)}
          onSave={(dadosEditados) => {
            setImoveis((prev) =>
              prev.map((i) =>
                i.id === imovelParaEditar.id ? mapFormToImovel(dadosEditados, i.id) : i
              )
            );
            setShowEditForm(false);
          }}
        />
      )}
    </div>
  );
}

export default ImovelCrud;
