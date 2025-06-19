import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../Sidebar";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContexts";

export function Layout() {
<<<<<<< Updated upstream
  const { user } = useContext(AuthContext);
  if (!user) {
    return <Navigate to="/login" replace />;
  }

=======
  const context = useContext(AuthContext);

  if (!context || !context.user) {
    return <Navigate to="/login" replace />;
  }

>>>>>>> Stashed changes
  return (
    <div className="flex">
      <Sidebar />
      <Outlet />
    </div>
  );
}
