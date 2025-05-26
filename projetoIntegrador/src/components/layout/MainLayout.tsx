import React from 'react';
import { Navigate } from 'react-router-dom';
import Header from './Header';
// import Sidebar from './Sidebar'; // Removido
import { cn } from '../../lib/utils';
import { Tabs, TabsContent } from '../../components/ui/tabs';
import { useAuth } from '../../contexts/AuthContexts';

interface MainLayoutProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

const MainLayout = ({ children, requireAdmin = false }: MainLayoutProps) => {
  const { user, isAdmin, isLoading } = useAuth();

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Carregando...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background w-full">
    <Header />

      <Tabs defaultValue="default">
        <TabsContent value="default" className="flex-1">
          <main className={cn(
            "flex-1 p-6 transition-all duration-300"
          )}>
            {children}
          </main>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MainLayout;

