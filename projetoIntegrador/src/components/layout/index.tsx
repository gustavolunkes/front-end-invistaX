import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../Sidebar";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContexts";

export function Layout() {
  return (
    <div className="flex">
      <Sidebar />
      <Outlet />
    </div>
  );
}
