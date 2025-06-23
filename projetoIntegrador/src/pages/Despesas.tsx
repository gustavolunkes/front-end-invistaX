import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../components/Card2";
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
import { FormDespesa } from "../components/ui/FormDespesa";
import { DespesaDetalhada } from "../components/Despesas/DespesasDetalhadas/index";
import { PageLayout } from "../components/layout/PageLayout";
import { Search } from "lucide-react";

// Interface para Despesa
interface Despesa {
  id: number;
  descricao: string;
  valor: number;
  data: string;
  categoria: string;
  imovel?: string;
}

// Dados de exemplo para o gráfico de despesas
const monthlyExpenseData = [
  { month: "Jan", value: 2500 },
  { month: "Fev", value: 2800 },
  { month: "Mar", value: 2600 },
  { month: "Abr", value: 3200 },
  { month: "Mai", value: 2900 },
  { month: "Jun", value: 2700 },
  { month: "Jul", value: 3100 },
  { month: "Ago", value: 2800 },
  { month: "Set", value: 2950 },
  { month: "Out", value: 3000 },
  { month: "Nov", value: 2850 },
  { month: "Dez", value: 3300 },
];

// Dados para o resumo de despesas
const expenseSummary = {
  totalExpenses: 8600,
  averageMonthly: 2867,
  yearToDate: 17200,
  projectedAnnual: 34400,
};

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

export default function Despesas() {
  const [period, setPeriod] = useState("all");
  const [tab, setTab] = useState("lista");
  const [showModal, setShowModal] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [despesaParaEditar, setDespesaParaEditar] = useState<Despesa | null>(null);
  const [despesaSelecionada, setDespesaSelecionada] = useState<Despesa | null>(null);
  const [busca, setBusca] = useState("");
  const [despesas, setDespesas] = useState<Despesa[]>(
    [
      { id: 1, descricao: "Condomínio", valor: 800, data: "2024-01-15", categoria: "Manutenção", imovel: "Apartamento Centro" },
      { id: 2, descricao: "Manutenção Ar Condicionado", valor: 450, data: "2024-01-20", categoria: "Manutenção", imovel: "Apartamento Centro" },
      { id: 3, descricao: "IPTU", valor: 350, data: "2024-01-10", categoria: "Imposto", imovel: "Casa Jardim" },
    ]
  );

  // Filtrar despesas com base na busca
  const despesasFiltradas = despesas.filter((despesa) => {
    const buscaLowerCase = busca.toLowerCase();
    return (
      despesa.descricao.toLowerCase().includes(buscaLowerCase) ||
      despesa.imovel?.toLowerCase().includes(buscaLowerCase) ||
      despesa.categoria.toLowerCase().includes(buscaLowerCase)
    );
  });

  return (
    <PageLayout 
      title="Despesas"
      rightContent={
        <Button
          className="flex items-center gap-2 bg-green-600 text-white cursor-pointer hover:bg-green-700"
          onClick={() => setShowModal(true)}
        >
          <span className="mr-2">+</span> Nova Despesa
        </Button>
      }
    >
      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total de Despesas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {formatCurrency(expenseSummary.totalExpenses)}
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
            <div className="text-2xl font-bold text-red-600">
              {formatCurrency(expenseSummary.averageMonthly)}
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
            <div className="text-2xl font-bold text-red-600">
              {formatCurrency(expenseSummary.yearToDate)}
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
            <div className="text-2xl font-bold text-red-600">
              {formatCurrency(expenseSummary.projectedAnnual)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Baseado na média atual
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Gráfico */}
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <CardTitle>Histórico de Despesas</CardTitle>
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
                data={monthlyExpenseData}
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
                  name="Despesas"
                  dataKey="value"
                  fill="#DC2626"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Despesas */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Lista de Despesas</h2>
          <div className="relative w-full sm:w-1/3">
            <Search className="absolute left-3 top-2.5 text-gray-500" size={18} />
            <Input
              className="pl-10 w-full"
              placeholder="Buscar despesas..."
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
            {despesasFiltradas.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center text-gray-500 py-6">
                  {busca ? "Nenhuma despesa encontrada." : "Nenhuma despesa cadastrada."}
                </td>
              </tr>
            ) : (
              despesasFiltradas.map((item, index) => (
                <tr key={index} className="border-b text-sm hover:bg-gray-50">
                  <td className="py-2 font-medium">{item.descricao}</td>
                  <td className="py-2 text-red-600 font-semibold">
                    R$ {item.valor.toFixed(2).replace(".", ",")}
                  </td>
                  <td className="py-2">
                    {new Date(item.data).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="py-2">{item.imovel}</td>
                  <td className="py-2 text-right">
                    <Button
                      variant="outline"
                      className="text-xs px-3 py-1"
                      onClick={() => setDespesaSelecionada(item)}
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
      {despesaSelecionada && (
        <DespesaDetalhada
          despesa={despesaSelecionada}
          onVoltar={() => setDespesaSelecionada(null)}
          onEditar={() => {
            setDespesaParaEditar(despesaSelecionada);
            setShowEditForm(true);
            setDespesaSelecionada(null);
          }}
          onExcluir={() => {
            setDespesas((prev) => prev.filter((d) => d.id !== despesaSelecionada.id));
            setDespesaSelecionada(null);
          }}
        />
      )}

      {showModal && (
        <FormDespesa
          setShowModal={setShowModal}
          onSave={(novaDespesa) => {
            setDespesas((prev) => [
              ...prev,
              { ...novaDespesa, id: prev.length ? prev[prev.length - 1].id + 1 : 1 },
            ]);
            setShowModal(false);
          }}
        />
      )}
      {showEditForm && despesaParaEditar && (
        <FormDespesa
          setShowModal={setShowEditForm}
          despesaParaEditar={despesaParaEditar}
          onSave={(dadosEditados) => {
            setDespesas((prev) =>
              prev.map((d) => (d.id === despesaParaEditar.id ? { ...d, ...dadosEditados } : d))
            );
            setShowEditForm(false);
          }}
        />
      )}
    </PageLayout>
  );
}