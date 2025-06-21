import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../Sidebar";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContexts";

export function Layout() {
  const { user } = useContext(AuthContext);
  // if (!user) {
  //   return <Navigate to="/login" replace />;
  // }

  return (
    <div className="flex">
      <Sidebar />
      <Outlet />
    </div>
  );
}
