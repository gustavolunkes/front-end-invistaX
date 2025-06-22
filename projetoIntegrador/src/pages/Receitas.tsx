import React, { useState } from "react";
import { PlusCircle, Search } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "../components/Card2";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { FormReceita } from "../components/ui/formReceita";
import { ReceitaDetalhada } from "../components/Receitas/ReceitasDetalhadas/index";
import { PageLayout } from "../components/layout/PageLayout";

// Interface para Receita
interface Receita {
  id: number;
  descricao: string;
  valor: number;
  data: string;
  categoria: string;
  imovel?: string;
}

// Dados de exemplo para o gráfico
const monthlyIncomeData = [
  { month: "Jan", value: 6000 },
  { month: "Fev", value: 6000 },
  { month: "Mar", value: 6000 },
  { month: "Abr", value: 6000 },
  { month: "Mai", value: 6000 },
  { month: "Jun", value: 6000 },
  { month: "Jul", value: 6000 },
  { month: "Ago", value: 6000 },
  { month: "Set", value: 6000 },
  { month: "Out", value: 6000 },
  { month: "Nov", value: 6000 },
  { month: "Dez", value: 6000 },
];

// Dados para o resumo
const incomeSummary = {
  totalIncome: 18000,
  averageMonthly: 6000,
  yearToDate: 36000,
  projectedAnnual: 72000,
};

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

const Receitas = () => {
  const [period, setPeriod] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [receitaParaEditar, setReceitaParaEditar] = useState<Receita | null>(null);
  const [receitaSelecionada, setReceitaSelecionada] = useState<Receita | null>(null);
  const [busca, setBusca] = useState("");
  const [receitas, setReceitas] = useState<Receita[]>(
    [
      {
        id: 1,
        descricao: "Aluguel",
        valor: 2500,
        data: "2024-01-15",
        categoria: "Aluguel",
        imovel: "Apartamento Centro",
      },
      {
        id: 2,
        descricao: "Taxa de Administração",
        valor: 200,
        data: "2024-01-15",
        categoria: "Taxa",
        imovel: "Apartamento Centro",
      },
      {
        id: 3,
        descricao: "Aluguel Comercial",
        valor: 3500,
        data: "2024-01-10",
        categoria: "Aluguel",
        imovel: "Loja Shopping",
      },
      {
        id: 4,
        descricao: "Aluguel Residencial",
        valor: 1800,
        data: "2024-01-12",
        categoria: "Aluguel",
        imovel: "Casa Jardim",
      },
    ]
  );

  // Filtrar receitas com base na busca
  const receitasFiltradas = receitas.filter((receita) => {
    const buscaLowerCase = busca.toLowerCase();
    return (
      receita.descricao.toLowerCase().includes(buscaLowerCase) ||
      receita.imovel?.toLowerCase().includes(buscaLowerCase) ||
      receita.categoria.toLowerCase().includes(buscaLowerCase)
    );
  });

  return (
    <PageLayout
      title="Receitas"
      rightContent={
        <Button
          className="flex items-center gap-2 bg-green-600 text-white cursor-pointer hover:bg-green-700"
          onClick={() => setShowModal(true)}
        >
          <PlusCircle className="h-5 w-5" />
          Nova Receita
        </Button>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total de Receitas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(incomeSummary.totalIncome)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Últimos 3 meses
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Média Mensal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(incomeSummary.averageMonthly)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Baseado nos últimos 3 meses
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Acumulado no Ano
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(incomeSummary.yearToDate)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Jan - Jun 2024
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Projeção Anual
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(incomeSummary.projectedAnnual)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Baseado na média atual
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader className="pb-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <CardTitle>Histórico de Receitas</CardTitle>
            <Select defaultValue={period} onValueChange={setPeriod}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Selecionar período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todo o período</SelectItem>
                <SelectItem value="year">Este ano</SelectItem>
                <SelectItem value="6months">Últimos 6 meses</SelectItem>
                <SelectItem value="3months">Últimos 3 meses</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={monthlyIncomeData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(value) => `R$${value / 1000}k`} />
                <Tooltip
                  formatter={(value) => formatCurrency(Number(value))}
                />
                <Legend />
                <Bar
                  name="Receitas"
                  dataKey="value"
                  fill="#10B981"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Receitas */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Lista de Receitas</h2>
          <div className="relative w-full sm:w-1/3">
            <Search className="absolute left-3 top-2.5 text-gray-500" size={18} />
            <Input
              className="pl-10 w-full"
              placeholder="Buscar receitas..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </div>
        </div>

        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-zinc-500 border-b">
              <th className="py-2">Descrição</th>
              <th className="py-2">Valor</th>
              <th className="py-2">Data</th>
              <th className="py-2">Imóvel</th>
            </tr>
          </thead>
          <tbody>
            {receitasFiltradas.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center text-gray-500 py-6">
                  {busca
                    ? "Nenhuma receita encontrada."
                    : "Nenhuma receita cadastrada."}
                </td>
              </tr>
            ) : (
              receitasFiltradas.map((item, index) => (
                <tr key={index} className="border-b text-sm hover:bg-gray-50">
                  <td className="py-2 font-medium">{item.descricao}</td>
                  <td className="py-2 text-green-600 font-semibold">
                    R$ {item.valor.toFixed(2).replace(".", ",")}
                  </td>
                  <td className="py-2">
                    {new Date(item.data).toLocaleDateString("pt-BR")}
                  </td>
                  <td className="py-2">{item.imovel}</td>
                  <td className="py-2 text-right">
                    <Button
                      variant="outline"
                      className="text-xs px-3 py-1"
                      onClick={() => setReceitaSelecionada(item)}
                    >
                      Ver detalhes
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL DE DETALHES */}
      {receitaSelecionada && (
        <ReceitaDetalhada
          receita={receitaSelecionada}
          onVoltar={() => setReceitaSelecionada(null)}
          onEditar={() => {
            setReceitaParaEditar(receitaSelecionada);
            setShowEditForm(true);
            setReceitaSelecionada(null);
          }}
          onExcluir={() => {
            setReceitas((prev) => prev.filter((r) => r.id !== receitaSelecionada.id));
            setReceitaSelecionada(null);
          }}
        />
      )}

      {showModal && (
        <FormReceita setShowModal={setShowModal} />
      )}
      {showEditForm && receitaParaEditar && (
        <FormReceita 
          setShowModal={setShowEditForm}
          // Se o FormReceita aceitar props de edição, adicione aqui
        />
      )}
    </PageLayout>
  );
};

export default Receitas;
