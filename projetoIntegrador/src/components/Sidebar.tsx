import { useState } from 'react';
import {
  Home,
  Building,
  DollarSign,
  Wallet,
  User,
  LogOut,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const menuItems = [
  { icon: <Home size={20} />, label: 'Dashboard', path: "/dashboard" },
  { icon: <Building size={20} />, label: 'Meus Imóveis', path: "/imoveis" },
  { icon: <DollarSign size={20} />, label: 'Receitas', path: "/receitas" },
  { icon: <Wallet size={20} />, label: 'Despesas', path: "/despesas" },
  { icon: <User size={20} />, label: 'Perfil', path: "/perfil" },
  { icon: <LogOut size={20} />, label: 'Sair', path: "/sair" },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate()

  return (
    <div className={`h-screen bg-zinc-900 text-white flex flex-col transition-all duration-300 ${isOpen ? 'w-64' : 'w-16'}`}>
      <div className="flex justify-end p-2">
        <button
          onClick={() => {setIsOpen(!isOpen)}}
          className="text-white hover:text-zinc-400"
        >
          {isOpen ? <ChevronLeft /> : <ChevronRight />}
        </button>
      </div>
      <nav className="flex flex-col gap-4 p-4">
        {menuItems.map((item, index) => (
          <div key={index} className="flex items-center gap-4 hover:bg-zinc-800 p-2 rounded cursor-pointer" onClick={()=> navigate(item.path)}>
            {item.icon}
            {isOpen && <span className="text-sm">{item.label}</span>}
          </div>
        ))}
      </nav>
    </div>
  );
}
