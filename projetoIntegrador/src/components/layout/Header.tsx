import React from 'react';
import { Search, User } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../components/ui/dropdown-menu';
import { cn } from '../../lib/utils';
import { useAuth } from '../../contexts/AuthContexts';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  return (
    <header className={cn(
      "bg-white border-b border-border h-16 flex items-center justify-between px-6 sticky top-0 z-10",
      // removi a margem que dependia da sidebar
      "transition-all duration-300"
    )}>
      <div className="flex items-center space-x-4 flex-1">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input 
            placeholder="Buscar..." 
            className="pl-10 bg-muted border-none"
          />
        </div>
      </div>
      
      <div className="flex items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <User className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>
              <div>
                <p className="font-semibold">{user?.name}</p>
                <p className="text-xs text-muted-foreground">{isAdmin ? 'Administrador' : 'Proprietário'}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate('/settings')}>Perfil</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => logout()}>Sair</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;

