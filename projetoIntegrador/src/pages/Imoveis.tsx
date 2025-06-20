import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Search, Pencil, Trash2, Tag, Check, X } from "lucide-react";
import { FormImovel } from "./FormImovel"; 

interface Imovel {
  id: number;
  nome: string;
  endereco: string;
  valorCompra: number;
  valorAtual: number;
  aluguelMensal: number;
  status: 'alugado' | 'vago';
}

const mockImoveis: Imovel[] = [
  {
    id: 1,
    nome: "Apartamento Centro",
    endereco: "Rua das Flores, 123 - Centro",
    valorCompra: 350000,
    valorAtual: 400000,
    aluguelMensal: 2500,
    status: 'vago'
  },
  {
    id: 2,
    nome: "Casa Jardins",
    endereco: "Rua dos Jardins, 456 - Jardim Primavera",
    valorCompra: 500000,
    valorAtual: 550000,
    aluguelMensal: 3500,
    status: 'alugado'
  },
  {
    id: 3,
    nome: "Sala Comercial",
    endereco: "Av. Paulista, 789 - Centro",
    valorCompra: 280000,
    valorAtual: 290000,
    aluguelMensal: 2000,
    status: 'vago'
  },
];

export default function Imoveis() {
  const [busca, setBusca] = useState("");
  const [filtro, setFiltro] = useState<'todos' | 'alugados' | 'vagos'>('todos');
  const [imoveis, setImoveis] = useState<Imovel[]>([]);
  const [showModal, setShowModal] = useState(false); // ✅ Novo estado adicionado
  const navigate = useNavigate();

  useEffect(() => {
    setImoveis(mockImoveis);
  }, []);

  const imoveisFiltrados = imoveis.filter(imovel => {
    const buscaMatch = imovel.nome.toLowerCase().includes(busca.toLowerCase()) ||
      imovel.endereco.toLowerCase().includes(busca.toLowerCase());
    const filtroMatch = filtro === 'todos' ||
      (filtro === 'alugados' && imovel.status === 'alugado') ||
      (filtro === 'vagos' && imovel.status === 'vago');
    return buscaMatch && filtroMatch;
  });

  const formatarMoeda = (valor: number) =>
    valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  const filtros = [
    { label: 'Todos', valor: 'todos' },
    { label: 'Alugados', valor: 'alugados' },
    { label: 'Vagos', valor: 'vagos' },
  ];

  return (
    <div className="flex flex-col gap-6 p-6 max-w-6xl mx-auto w-full">
      {/* Modal do formulário de imóvel */}
      {showModal && <FormImovel setShowModal={setShowModal} />} {/* ✅ Renderização condicional */}

      {/* Cabeçalho */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Imóveis</h1>
        <Button
          className="bg-green-600 hover:bg-green-700 cursor-pointer"
          onClick={() => setShowModal(true)} // ✅ Ação do botão
        >
          + Adicionar Imóvel
        </Button>
      </div>

      {/* Filtros e busca */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative w-full sm:w-1/3">
          <Search className="absolute left-3 top-2.5 text-gray-500" size={18} />
          <Input
            className="pl-10 w-full"
            placeholder="Buscar imóveis..."
            value={busca}
            onChange={e => setBusca(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          {filtros.map(f => (
            <Button
              key={f.valor}
              variant={filtro === f.valor ? "default" : "outline"}
              className={`px-4 cursor-pointer ${
                filtro === f.valor ? "bg-green-600 text-white hover:bg-green-700" : "hover:bg-gray-100"
              }`}
              onClick={() => setFiltro(f.valor as any)}
            >
              {f.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Cartões de imóveis */}
      <div className="space-y-6">
        {imoveisFiltrados.map(imovel => (
          <div key={imovel.id} className="border rounded-xl p-6 shadow-sm w-full">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <h2 className="text-xl font-semibold">{imovel.nome}</h2>
                <p className="text-gray-600">{imovel.endereco}</p>
                <div className="flex items-center gap-2 mt-4">
                  {imovel.status === 'alugado' ? (
                    <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full flex items-center gap-1">
                      <Check size={14} /> Alugado
                    </span>
                  ) : (
                    <span className="bg-red-100 text-red-800 text-sm px-3 py-1 rounded-full flex items-center gap-1">
                      <X size={14} /> Vago
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-gray-500">Valor da compra</p>
                  <p className="font-semibold">{formatarMoeda(imovel.valorCompra)}</p>
                </div>
                <div>
                  <p className="text-gray-500">Valor atual</p>
                  <p className="font-semibold">{formatarMoeda(imovel.valorAtual)}</p>
                </div>
                <div>
                  <p className="text-gray-500">Aluguel mensal</p>
                  <p className="font-semibold text-green-600">{formatarMoeda(imovel.aluguelMensal)}</p>
                </div>
              </div>

              <div className="flex flex-col gap-3 justify-between">
                <Button
                  variant="outline"
                  className="w-full hover:bg-gray-100"
                  onClick={() => navigate(`/detalhesimovel/${imovel.id}`)}
                >
                  Ver detalhes
                </Button>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1 flex gap-2 items-center hover:bg-gray-100">
                    <Pencil size={16} /> Editar
                  </Button>
                  <Button variant="outline" className="flex-1 flex gap-2 items-center text-red-600 hover:text-red-700 hover:bg-red-100">
                    <Trash2 size={16} /> Excluir
                  </Button>
                </div>
                <Button variant="outline" className="w-full flex gap-2 items-center hover:bg-gray-100">
                  <Tag size={16} /> Liquidar
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tabela final resumida */}
      <div className="bg-white rounded-lg shadow p-4 mt-10">
        <h2 className="text-xl font-semibold mb-4">Resumo dos Imóveis</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-zinc-500 border-b">
              <th className="py-2">Nome</th>
              <th className="py-2">Endereço</th>
              <th className="py-2">Compra</th>
              <th className="py-2">Atual</th>
              <th className="py-2">Aluguel</th>
              <th className="py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {imoveisFiltrados.map(imovel => (
              <tr key={imovel.id} className="border-b">
                <td className="py-2">{imovel.nome}</td>
                <td className="py-2">{imovel.endereco}</td>
                <td className="py-2">{formatarMoeda(imovel.valorCompra)}</td>
                <td className="py-2">{formatarMoeda(imovel.valorAtual)}</td>
                <td className="py-2">{formatarMoeda(imovel.aluguelMensal)}</td>
                <td className="py-2">{imovel.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
