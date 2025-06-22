import React from "react";
import { ProfileMenu } from "../ui/ProfileMenu";
import { useNavigate } from "react-router-dom";

interface PageLayoutProps {
  title: string;
  children: React.ReactNode;
  rightContent?: React.ReactNode;
}

export const PageLayout = ({ title, children, rightContent }: PageLayoutProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Lógica de logout - limpar localStorage, context, etc.
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // Limpar outros dados se necessário
    navigate('/login');
  };

  const handleProfile = () => {
    // Navegar para página de perfil
    navigate('/perfil');
  };

  return (
    <div className="flex flex-col gap-6 p-6 mx-auto w-full max-h-screen overflow-y-auto">
      {/* Header com título e botão de perfil */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        <div className="flex items-center gap-3">
          {rightContent}
          <ProfileMenu onLogout={handleLogout} onProfile={handleProfile} />
        </div>
      </div>
      
      {/* Conteúdo da página */}
      {children}
    </div>
  );
};