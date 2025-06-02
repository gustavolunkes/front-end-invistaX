import { useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { ArrowLeft, PlusCircle } from "lucide-react";
import MainLayout from "../components/layout/MainLayout";
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
} from 'recharts';

const mockImoveis = [
  {
    id: 1,
    nome: "Apartamento Centro",
    receitas: [
      { mes: "Jan", valor: 2500 },
      { mes: "Fev", valor: 2500 },
      { mes: "Mar", valor: 2500 },
      { mes: "Abr", valor: 2500 },
      { mes: "Mai", valor: 2500 },
      { mes: "Jun", valor: 2500 },
    ],
  },
  {
    id: 2,
    nome: "Casa Jardins",
    receitas: [
      { mes: "Jan", valor: 3500 },
      { mes: "Fev", valor: 3500 },
      { mes: "Mar", valor: 3500 },
      { mes: "Abr", valor: 3500 },
      { mes: "Mai", valor: 3500 },
      { mes: "Jun", valor: 3500 },
    ],
  },
];

export default function ReceitasEspecificas() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [period, setPeriod] = useState('all');
  const imovel = mockImoveis.find((im) => im.id === Number(id));

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  if (!imovel) {
    return (
      <MainLayout>
        <div className="p-6">
          <p>Imóvel não encontrado.</p>
          <Button variant="outline" onClick={() => navigate(-1)} className="mt-4">
            Voltar
          </Button>
        </div>
      </MainLayout>
    );
  }

  // Filtra receitas com base no período selecionado
  const filterReceitasByPeriod = () => {
    const allReceitas = [...imovel.receitas];
    
    switch (period) {
      case 'year':
        return allReceitas.slice(0, 6); // Primeiros 6 meses (este ano)
      case '6months':
        return allReceitas.slice(0, 6); // Últimos 6 meses
      case '3months':
        return allReceitas.slice(0, 3); // Últimos 3 meses
      default:
        return allReceitas; // Todo o período
    }
  };

  const receitasFiltradas = filterReceitasByPeriod();

  // Calcula totais com base nas receitas filtradas
  const calcularTotais = () => {
    const total = receitasFiltradas.reduce((sum, receita) => sum + receita.valor, 0);
    const media = total / receitasFiltradas.length;
    const projetadoAnual = media * 12;
    
    return {
      total,
      media,
      projetadoAnual
    };
  };

  const totais = calcularTotais();

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate(-1)}>
              <ArrowLeft size={18} className="mr-2" />
              Voltar
            </Button>
            <h1 className="text-3xl font-bold tracking-tight">Receitas - {imovel.nome}</h1>
          </div>
          <Button className="flex items-center gap-2">
            <PlusCircle className="h-5 w-5" />
            Nova Receita
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total de Receitas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatCurrency(totais.total)}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {period === '3months' ? 'Últimos 3 meses' : 
                 period === '6months' ? 'Últimos 6 meses' : 
                 period === 'year' ? 'Este ano' : 'Todo o período'}
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
              <div className="text-2xl font-bold">
                {formatCurrency(totais.media)}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {period === '3months' ? 'Últimos 3 meses' : 
                 period === '6months' ? 'Últimos 6 meses' : 
                 period === 'year' ? 'Este ano' : 'Todo o período'}
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
              <div className="text-2xl font-bold">
                {formatCurrency(imovel.receitas.slice(0, 6).reduce((sum, receita) => sum + receita.valor, 0))}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Jan - Jun 2023
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
              <div className="text-2xl font-bold">
                {formatCurrency(totais.projetadoAnual)}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Baseado na média atual
              </p>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader className="pb-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <CardTitle>Histórico de Receitas</CardTitle>
              <Select value={period} onValueChange={setPeriod}>
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
                  data={receitasFiltradas}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mes" />
                  <YAxis tickFormatter={(value) => `R$${value / 1000}k`} />
                  <Tooltip 
                    formatter={(value) => formatCurrency(Number(value))}
                    labelFormatter={(label) => `Mês: ${label}`}
                  />
                  <Legend />
                  <Bar 
                    name="Receitas" 
                    dataKey="valor" 
                    fill="#10B981" 
                    radius={[4, 4, 0, 0]} 
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            {/* Lista detalhada das receitas */}
            <div className="mt-6 border rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Mês
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Valor
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {receitasFiltradas.map((receita, index) => (
                    <tr key={index}>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                        {receita.mes}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-right text-green-600 font-medium">
                        {formatCurrency(receita.valor)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}