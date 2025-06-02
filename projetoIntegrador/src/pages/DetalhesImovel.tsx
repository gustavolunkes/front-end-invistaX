// detalhesimovel.tsx
import { useParams, useNavigate } from "react-router-dom"
import { Button } from "../components/ui/button"
import { ArrowLeft, Building2, MapPin, DollarSign } from "lucide-react"

const mockImoveis = [
  {
    id: 1,
    nome: "Apartamento Centro",
    endereco: "Rua das Flores, 123 - Centro",
    tipo: "Apartamento",
    valorCompra: 350000,
    valorAtual: 400000,
    aluguelMensal: 2500,
    receitaAnual: 30000,
    despesasAnuais: 9000,
    roi: 8.57,
    valorizacao: 14.29,
  },
  {
    id: 2,
    nome: "Casa Jardins",
    endereco: "Rua dos Jardins, 456 - Jardim Primavera",
    tipo: "Casa",
    valorCompra: 500000,
    valorAtual: 550000,
    aluguelMensal: 3500,
    receitaAnual: 42000,
    despesasAnuais: 10000,
    roi: 8.4,
    valorizacao: 10,
  },
]

export default function DetalhesImovel() {
  const { id } = useParams()
  const navigate = useNavigate()

  const imovel = mockImoveis.find(im => im.id === Number(id))

  if (!imovel) {
    return (
      <div className="p-6">
        <p>Imóvel não encontrado.</p>
        <Button variant="outline" onClick={() => navigate(-1)} className="mt-4">Voltar</Button>
      </div>
    )
  }

  const lucroLiquido = imovel.receitaAnual - imovel.despesasAnuais

  return (
    <div className="p-6 w-full">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate(-1)} className="cursor-pointer hover:bg-gray-100">
            <ArrowLeft className="mr-2" size={18} />
            Voltar
          </Button>
          <h1 className="text-2xl font-bold">{imovel.nome}</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="default" className="bg-green-600 hover:bg-green-700 cursor-pointer" onClick={() => navigate(`/detalhesimovel/${imovel.id}/receitas`)}>Receitas</Button>
          <Button variant="outline" className="text-red-600 border-red-600 hover:bg-red-100 cursor-pointer" onClick={() => navigate(`/detalhesimovel/${imovel.id}/despesas`)}>Despesas</Button>
          <Button variant="outline" className="cursor-pointer hover:bg-gray-100">Editar</Button>
          <Button variant="ghost" className="text-red-600 hover:bg-red-100 cursor-pointer">Excluir</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Informações Gerais */}
        <div className="border p-5 rounded-xl">
          <h2 className="text-xl font-semibold mb-4">Informações Gerais</h2>
          <div className="mb-2 text-sm text-gray-600">
            <p className="flex items-center gap-2"><Building2 size={16} /> {imovel.tipo}</p>
            <p className="flex items-center gap-2"><MapPin size={16} /> {imovel.endereco}</p>
          </div>
          <hr className="my-4" />
          <div className="text-sm space-y-2">
            <p><strong>Valor de Compra:</strong> R$ {imovel.valorCompra.toLocaleString()}</p>
            <p><strong>Valor Atual:</strong> R$ {imovel.valorAtual.toLocaleString()} <span className="text-green-600">↑ {imovel.valorizacao}% de valorização</span></p>
            <p><strong>Aluguel Mensal:</strong> <span className="text-green-600">R$ {imovel.aluguelMensal.toLocaleString()}</span></p>
            <p><strong>Retorno sobre Investimento (ROI):</strong> <span className="text-green-600">{imovel.roi}% ao ano</span></p>
          </div>
          <Button variant="outline" className="mt-6 w-full flex gap-2 justify-center cursor-pointer hover:bg-gray-100">
            <DollarSign size={16} />
            Liquidar este imóvel
          </Button>
        </div>

        {/* Resumo Financeiro */}
        <div className="border p-5 rounded-xl">
          <h2 className="text-xl font-semibold mb-4">Resumo Financeiro</h2>
          <div className="text-sm space-y-4">
            <p><strong>Receita Anual:</strong> <span className="text-green-600">R$ {imovel.receitaAnual.toLocaleString()}</span></p>
            <p><strong>Despesas Anuais:</strong> <span className="text-red-600">R$ {imovel.despesasAnuais.toLocaleString()}</span></p>
            <hr />
            <p><strong>Lucro Líquido Anual:</strong> <span className="text-black">R$ {lucroLiquido.toLocaleString()}</span></p>
          </div>
          <div className="mt-6 flex flex-col gap-2">
            <Button className="bg-green-600 hover:bg-green-700 w-full cursor-pointer" onClick={() => navigate(`/detalhesimovel/${imovel.id}/receitas`)}>Ver Receitas</Button>
            <Button className="bg-green-600 hover:bg-green-700 w-full cursor-pointer" onClick={() => navigate(`/detalhesimovel/${imovel.id}/despesas`)}>Ver Despesas</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
