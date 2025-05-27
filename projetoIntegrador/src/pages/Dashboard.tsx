import { useEffect, useState } from 'react';
import { Home, BarChart2, TrendingUp, DollarSign } from 'lucide-react';

function Dashboard() {
  const [quantidadeImoveis, setQuantidadeImoveis] = useState(null);
  const [valorTotalPatrimonio, setValorTotalPatrimonio] = useState(null);
  const [receitaMensal, setReceitaMensal] = useState(null); // estado novo

  useEffect(() => {
    async function buscarQuantidade() {
      try {
        const res = await fetch('http://localhost:8080/dashboard/imovel/quantidade');
        if (!res.ok) throw new Error('Erro na resposta da API: ' + res.status);
        const data = await res.json();
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

    async function buscarValorTotal() {
      try {
        const res = await fetch('http://localhost:8080/dashboard/valor-total');
        if (!res.ok) throw new Error('Erro na resposta da API: ' + res.status);
        const data = await res.json();
        if (typeof data === 'number') {
          setValorTotalPatrimonio(data);
        } else if (data.valor !== undefined) {
          setValorTotalPatrimonio(data.valor);
        } else {
          setValorTotalPatrimonio(0);
        }
      } catch (err) {
        setValorTotalPatrimonio(0);
      }
    }

    async function buscarReceitaMensal() {
      try {
        // Ajusta essa URL pro endpoint correto que retorna a receita mensal
        const res = await fetch('http://localhost:8080/renevue/imovel/total'); 
        if (!res.ok) throw new Error('Erro na resposta da API: ' + res.status);
        const data = await res.json();

        // Se a API retornar só o número:
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

    buscarQuantidade();
    buscarValorTotal();
    buscarReceitaMensal(); // chama o fetch do novo dado
  }, []);

  function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
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
            {quantidadeImoveis !== null ? quantidadeImoveis : 'Carregando...'}
          </p>
        </div>

        {/* Card Valor do Patrimônio */}
        <div className="bg-white p-6 rounded-lg shadow-sm border-t-4 border-purple-500">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-500 font-medium">Valor Total do Patrimônio</h3>
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

        {/* Card Receita Mensal */}
        <div className="bg-white p-6 rounded-lg shadow-sm border-t-4 border-red-500">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-500 font-medium">Receita Mensal</h3>
            <DollarSign className="text-red-500" size={20} />
          </div>
          <p className="text-3xl font-bold text-gray-800">
            {receitaMensal !== null ? formatarMoeda(receitaMensal) : 'Carregando...'}
          </p>
        </div>
        
      </div>
    </div>
  );
}

export default Dashboard;
