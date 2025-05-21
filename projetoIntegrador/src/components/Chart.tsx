// components/Chart.tsx
export function Chart() {
  // Valores mockados baseados no protótipo
  const values = [1800, 1350, 900, 450];
  const maxValue = Math.max(...values);
  
  return (
    <div className="bg-zinc-700 rounded-lg p-4 shadow-md">
      <h3 className="text-zinc-300 text-sm mb-4">Evolução Patrimonial</h3>
      <div className="flex items-end h-40 gap-2">
        {values.map((value, index) => {
          const height = (value / maxValue) * 100;
          return (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div 
                className="w-full bg-blue-500 rounded-t-sm"
                style={{ height: `${height}%` }}
              />
              <span className="text-xs text-zinc-400 mt-1">R${value}k</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}