import { useState, useEffect } from 'react';
import { Home, BarChart2, TrendingUp, ArrowUp, ArrowDown } from 'lucide-react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

type ApiResponse = {
  quantidade?: number;
  valor?: number;
  valorTotal?: number;
  [key: string]: any;
};

export function Dashboard() {
  const [quantidadeImoveis, setQuantidadeImoveis] = useState<number | null>(12);
  const [valorTotalPatrimonio, setValorTotalPatrimonio] = useState<number | null>(2850000);
  const [receitaMensal, setReceitaMensal] = useState<number | null>(12500);
  const [despesaMensal, setDespesaMensal] = useState<number | null>(7800);

  const [dadosMensais, setDadosMensais] = useState({
    meses: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
    receitas: [5000, 7000, 6000, 9000, 12000, 12500],
    despesas: [4000, 5000, 5500, 6000, 7500, 7800]
  });

    const opcoesComuns = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            return `R$ ${context.raw.toLocaleString('pt-BR')}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value: any) {
            return `R$ ${value.toLocaleString('pt-BR')}`;
          }
        }
      }
    }
  };

  // Dados para o gráfico de receitas
  const dadosGraficoReceitas = {
    labels: dadosMensais.meses,
    datasets: [{
      label: 'Receitas Mensais',
      data: dadosMensais.receitas,
      backgroundColor: 'rgba(34, 197, 94, 0.7)',
      borderColor: 'rgba(34, 197, 94, 1)',
      borderWidth: 1
    }]
  };

  // Dados para o gráfico de despesas
  const dadosGraficoDespesas = {
    labels: dadosMensais.meses,
    datasets: [{
      label: 'Despesas Mensais',
      data: dadosMensais.despesas,
      backgroundColor: 'rgba(239, 68, 68, 0.7)',
      borderColor: 'rgba(239, 68, 68, 1)',
      borderWidth: 1
    }]
  };
 
  async function fetchData(url: string): Promise<ApiResponse> {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Erro HTTP: ${res.status}`);
    return await res.json();
  }

  async function buscarQuantidadeImoveis() {
    try {
      const data = await fetchData('http://localhost:8080/dashboard/imovel/quantidade');
      
      if (typeof data === 'number') {
        setQuantidadeImoveis(data);
      } else if (data.quantidade !== undefined) {
        setQuantidadeImoveis(data.quantidade);
      } else {
        setQuantidadeImoveis(0);
      }
    } catch (err) {
      setQuantidadeImoveis(0);
    }
  }

  async function buscarValorTotalPatrimonio() {
    try {
      const data = await fetchData('http://localhost:8080/dashboard/valor-total');
      
      if (typeof data === 'number') {
        setValorTotalPatrimonio(data);
      } else if (data.valor !== undefined) {
        setValorTotalPatrimonio(data.valor);
      } else if (data.valorTotal !== undefined) {
        setValorTotalPatrimonio(data.valorTotal);
      } else {
        setValorTotalPatrimonio(0);
      }
    } catch (err) {
      setValorTotalPatrimonio(0);
    }
  }

  async function buscarReceitaMensal() {
    try {
      const data = await fetchData('http://localhost:8080/revenue/imovel/total');
      
      if (typeof data === 'number') {
        setReceitaMensal(data);
      } else if (data.valorTotal !== undefined) {
        setReceitaMensal(data.valorTotal);
      } else {
        setReceitaMensal(0);
      }
    } catch (err) {
      setReceitaMensal(0);
    }
  }

  async function buscarDespesaMensal() {
    try {
      const data = await fetchData('http://localhost:8080/expenses/imovel/total');
      
      if (typeof data === 'number') {
        setDespesaMensal(data);
      } else if (data.valorTotal !== undefined) {
        setDespesaMensal(data.valorTotal);
      } else {
        setDespesaMensal(0);
      }
    } catch (err) {
      setDespesaMensal(0);
    }
  }

  async function buscarDadosMensais() {
  try {
    const res = await fetch('http://localhost:8080/dashboard/mensal');
    const data = await res.json();
    setDadosMensais(data);
  } catch (err) {
    console.error("Erro ao buscar dados mensais:", err);
    // Mantém os dados mockados em caso de erro
  }
}

  useEffect(() => {
    // Carrega todos os dados quando o componente monta
    buscarQuantidadeImoveis();
    buscarValorTotalPatrimonio();
    buscarReceitaMensal();
    buscarDespesaMensal();
    buscarDadosMensais();

  }, []);

  // Função para formatar moeda
  function formatarMoeda(valor: number | null): string {
    if (valor === null) return 'R$ 0,00';
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }

  // Cálculo do saldo mensal
  const saldoMensal = (receitaMensal || 0) - (despesaMensal || 0);

  return (
    <div className="p-6 bg-gray-50 min-h-screen max-h-screen overflow-y-auto w-full">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>

      {/* Cards de Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total de Imóveis */}
        <div className="bg-white p-6 rounded-lg shadow-sm border-t-4 border-blue-500">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-500 font-medium">Total de Imóveis</h3>
            <Home className="text-blue-500" size={20} />
          </div>
          <p className="text-3xl font-bold text-gray-800">
            {quantidadeImoveis !== null ? quantidadeImoveis : 'Carregando...'}
          </p>
        </div>

        {/* Valor do Patrimônio */}
        <div className="bg-white p-6 rounded-lg shadow-sm border-t-4 border-purple-500">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-500 font-medium">Valor do Patrimônio</h3>
            <BarChart2 className="text-purple-500" size={20} />
          </div>
          <p className="text-2xl font-bold text-gray-800 mb-1">
            {valorTotalPatrimonio !== null ? formatarMoeda(valorTotalPatrimonio) : 'Carregando...'}
          </p>
          <div className="flex items-center text-green-500 text-sm">
            <TrendingUp size={16} className="mr-1" />
            <span>↑ 4.5% vs mês anterior</span>
          </div>
        </div>

        {/* Receitas */}
        <div className="bg-white p-6 rounded-lg shadow-sm border-t-4 border-green-500">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-500 font-medium">Receitas Mensais</h3>
            <ArrowUp className="text-green-500" size={20} />
          </div>
          <p className="text-2xl font-bold text-gray-800">
            {receitaMensal !== null ? formatarMoeda(receitaMensal) : 'Carregando...'}
          </p>
        </div>

        {/* Despesas */}
        <div className="bg-white p-6 rounded-lg shadow-sm border-t-4 border-red-500">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-500 font-medium">Despesas Mensais</h3>
            <ArrowDown className="text-red-500" size={20} />
          </div>
          <p className="text-2xl font-bold text-gray-800">
            {despesaMensal !== null ? formatarMoeda(despesaMensal) : 'Carregando...'}
          </p>
        </div>
      </div>
      
      {/* Área dos Gráficos Separados */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Gráfico de Receitas */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <ArrowUp className="text-green-500 mr-2" size={20} />
            Receitas Mensais
          </h2>
          <div className="h-64">
            <Bar data={dadosGraficoReceitas} options={opcoesComuns} />
          </div>
        </div>

        {/* Gráfico de Despesas */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <ArrowDown className="text-red-500 mr-2" size={20} />
            Despesas Mensais
          </h2>
          <div className="h-64">
            <Bar data={dadosGraficoDespesas} options={opcoesComuns} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;