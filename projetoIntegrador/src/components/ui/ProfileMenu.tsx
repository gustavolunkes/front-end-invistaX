import React, { useState } from "react";
import { User, LogOut, Settings } from "lucide-react";
import { Button } from "./button";

interface ProfileMenuProps {
  onLogout?: () => void;
  onProfile?: () => void;
}

export const ProfileMenu = ({ onLogout, onProfile }: ProfileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogoutClick = () => {
    setIsOpen(false);
    setShowLogoutConfirm(true);
  };

  const handleConfirmLogout = () => {
    setShowLogoutConfirm(false);
    onLogout?.();
  };

  return (
    <>
      <div className="relative">
        <Button
          variant="ghost"
          size="sm"
          className="rounded-full p-2 h-10 w-10"
          onClick={() => setIsOpen(!isOpen)}
        >
          <User size={20} className="text-gray-600" />
        </Button>

        {isOpen && (
          <>
            {/* Overlay para fechar o menu */}
            <div 
              className="fixed inset-0 z-10"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Menu dropdown */}
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
              <div className="py-1">
                <button
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                  onClick={() => {
                    setIsOpen(false);
                    onProfile?.();
                  }}
                >
                  <Settings size={16} />
                  Perfil
                </button>
                <hr className="border-gray-100" />
                <button
                  className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                  onClick={handleLogoutClick}
                >
                  <LogOut size={16} />
                  Sair
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Modal de confirmação de logout */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm flex flex-col items-center">
            <p className="mb-4 text-center text-lg font-semibold">
              Tem certeza que deseja sair?
            </p>
            <div className="flex gap-4">
              <Button
                variant="destructive"
                className="bg-red-600 text-white"
                onClick={handleConfirmLogout}
              >
                Sim
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowLogoutConfirm(false)}
              >
                Cancelar
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};