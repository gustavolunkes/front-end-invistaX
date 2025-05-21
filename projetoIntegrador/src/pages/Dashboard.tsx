import { TrendingUp, Home, DollarSign, BarChart2, Wallet } from 'lucide-react';

function Dashboard() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>

      {/* 5 Cards Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        {/* Card Total de Imóveis */}
        <div className="bg-white p-6 rounded-lg shadow-sm border-t-4 border-blue-500">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-500 font-medium">Total de Imóveis</h3>
            <Home className="text-blue-500" size={20} />
          </div>
          <p className="text-3xl font-bold text-gray-800">5</p>
        </div>

        {/* Card Retorno Anual */}
        <div className="bg-white p-6 rounded-lg shadow-sm border-t-4 border-green-500">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-500 font-medium">Retorno Anual</h3>
            <TrendingUp className="text-green-500" size={20} />
          </div>
          <p className="text-3xl font-bold text-gray-800">5.82%</p>
        </div>

        {/* Card Valor do Patrimônio */}
        <div className="bg-white p-6 rounded-lg shadow-sm border-t-4 border-purple-500">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-500 font-medium">Valor Total do Patrimônio</h3>
            <BarChart2 className="text-purple-500" size={20} />
          </div>
          <p className="text-2xl font-bold text-gray-800 mb-1">R$ 1.750.000</p>
          <div className="flex items-center text-green-500 text-sm">
            <TrendingUp size={16} className="mr-1" />
            <span>↑ 4.5% vs mês anterior</span>
          </div>
        </div>

        {/* Card Valorização */}
        <div className="bg-white p-6 rounded-lg shadow-sm border-t-4 border-yellow-500">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-500 font-medium">Valorização</h3>
            <TrendingUp className="text-yellow-500" size={20} />
          </div>
          <p className="text-3xl font-bold text-gray-800">+4.50%</p>
        </div>

        {/* Card Receita Mensal */}
        <div className="bg-white p-6 rounded-lg shadow-sm border-t-4 border-red-500">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-500 font-medium">Receita Mensal</h3>
            <DollarSign className="text-red-500" size={20} />
          </div>
          <p className="text-3xl font-bold text-gray-800">R$ 8.500</p>
        </div>
      </div>

      {/* Área de Gráficos - Receitas vs Despesas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Gráfico de Receitas */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Receitas</h2>
            <DollarSign className="text-green-500" size={20} />
          </div>
          
          <div className="h-64 flex items-end space-x-2">
            {/* Barras do gráfico */}
            {[10, 7.5, 5, 2.5, 0].map((value, index) => (
              <div key={`receita-${index}`} className="flex-1 flex flex-col items-center">
                <div 
                  className="bg-green-500 w-full rounded-t"
                  style={{ height: `${(value / 10) * 100}%` }}
                ></div>
                <span className="text-xs text-gray-500 mt-1">
                  {['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'][index]}
                </span>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center mt-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-800">R$1350k</p>
              <p className="text-sm text-gray-500">Total Anual</p>
            </div>
          </div>
        </div>

        {/* Gráfico de Despesas */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Despesas</h2>
            <Wallet className="text-red-500" size={20} />
          </div>
          
          <div className="h-64 flex items-end space-x-2">
            {/* Barras do gráfico */}
            {[3.2, 2.4, 1.6, 0.8, 0].map((value, index) => (
              <div key={`despesa-${index}`} className="flex-1 flex flex-col items-center">
                <div 
                  className="bg-red-500 w-full rounded-t"
                  style={{ height: `${(value / 3.2) * 100}%` }}
                ></div>
                <span className="text-xs text-gray-500 mt-1">
                  {['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'][index]}
                </span>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center mt-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-800">R$450k</p>
              <p className="text-sm text-gray-500">Total Anual</p>
            </div>
          </div>
        </div>
      </div>

      {/* Gráfico de Evolução Patrimonial */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Evolução Patrimonial</h2>
        
        <div className="h-64 flex items-end space-x-4">
          {/* Barras do gráfico */}
          {[1350, 900, 450, 0].map((value, index) => (
            <div key={`patrimonio-${index}`} className="flex-1 bg-blue-100 rounded-t flex flex-col items-center" style={{ height: '100%' }}>
              <div 
                className="bg-blue-500 w-full rounded-t"
                style={{ height: `${(value / 1350) * 100}%` }}
              ></div>
              <span className="text-xs text-gray-500 mt-1">
                {['Jan 2023', 'Mar 2023', 'Jun 2023', 'Sep 2023', 'Dec 2023', 'Mar 2024'][index]}
              </span>
            </div>
          ))}
        </div>
        
        <div className="flex justify-between mt-2 px-4">
          {[0, 450, 900, 1350].map(value => (
            <span key={`value-${value}`} className="text-xs text-gray-500">
              R${value}k
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;