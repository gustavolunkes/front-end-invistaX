// src/components/Dashboard.tsx (ou onde quer que seu componente Dashboard esteja)

import { useEffect, useState } from 'react';
import { Home, BarChart2, DollarSign } from 'lucide-react'; // Removi TrendingUp se não for usado no layout
import { api } from '../api/index'; // Importe a instância da sua API centralizada
import { type DashboardResumo } from '../api/route/dashboard/dashboardRoute'; // Importe a interface para o resumo

function Dashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardResumo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDashboardData() {
      setLoading(true);
      setError(null); // Reseta o erro
      try {
        // Chamada única para o endpoint de resumo
        const data = await api.dashboard.getDashboardResumo();
        setDashboardData(data);
      } catch (err) {
        console.error('Erro ao buscar dados do Dashboard:', err);
        setError('Não foi possível carregar os dados do dashboard.');
        setDashboardData(null); // Limpa os dados em caso de erro
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []); // O array vazio garante que o useEffect rode apenas uma vez ao montar

  function formatarMoeda(valor: number | null | undefined) { // <<-- Adicione '| undefined' aqui!
  if (valor === null || valor === undefined) return 'Carregando...'; // <<-- Ajuste a checagem
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

  // Se precisar de alguma outra formatação ou fallback para os números
  function formatarNumero(valor: number | null | undefined) { // <<-- Adicione '| undefined' aqui!
  if (valor === null || valor === undefined) return 'Carregando...'; // <<-- Ajuste a checagem
  return valor.toLocaleString('pt-BR');
}

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-600">
        Carregando Dashboard...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen max-h-screen overflow-y-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        {/* Card Total de Imóveis */}
        <div className="bg-white p-6 rounded-lg shadow-sm border-t-4 border-blue-500">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-500 font-medium">Total de Imóveis</h3>
            <Home className="text-blue-500" size={20} />
          </div>
          <p className="text-3xl font-bold text-gray-800">
            {formatarNumero(dashboardData?.quantidadeImoveis)}
          </p>
        </div>

        {/* Card Valor do Patrimônio */}
        <div className="bg-white p-6 rounded-lg shadow-sm border-t-4 border-purple-500">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-500 font-medium">Valor Total do Patrimônio</h3>
            <BarChart2 className="text-purple-500" size={20} />
          </div>
          <p className="text-2xl font-bold text-gray-800 mb-1">
            {formatarMoeda(dashboardData?.valorTotalImoveis)}
          </p>
          <div className="flex items-center text-green-500 text-sm">
            {/* O "↑ 4.5% vs mês anterior" é um dado fixo, se for dinâmico, precisaria vir da API */}
            {/* <TrendingUp size={16} className="mr-1" /> */}
            <span>Dados mensais não disponíveis</span>
          </div>
        </div>

        {/* Card Receita Mensal */}
        <div className="bg-white p-6 rounded-lg shadow-sm border-t-4 border-red-500">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-500 font-medium">Receita Mensal</h3>
            <DollarSign className="text-red-500" size={20} />
          </div>
          <p className="text-3xl font-bold text-gray-800">
            {formatarMoeda(dashboardData?.receitaTotal)}
          </p>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;