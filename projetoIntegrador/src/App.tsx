import { createBrowserRouter } from "react-router-dom";
<<<<<<< Updated upstream
import Perfil from "./pages/Perfil";
import "./App.css";
import { Layout } from "./components/layout";
import Imoveis from "./pages/Imoveis";
=======
import { RouterProvider } from "react-router-dom";
import Perfil from "./pages/Perfil";
import "./App.css";
import { Layout } from "./components/layout";
import ImovelCrud from "./pages/Imoveis";
>>>>>>> Stashed changes
import Receitas from "./pages/Receitas";
import Despesas from "./pages/Despesas";
import Sair from "./pages/Sair";
import Login from "./pages/Login";
<<<<<<< Updated upstream
import { Dashboard } from "./pages/Dashboard";

export const routerApp = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        element: <Imoveis />,
=======
import { Dashboard } from "./pages/dashboard";
import { AuthProvider } from "./contexts/AuthContexts";

export const routerApp = createBrowserRouter([
  { 
    element: <Layout />,
    children: [
      {
        element: <ImovelCrud />,
>>>>>>> Stashed changes
        path: "/imoveis",
      },
      {
        element: <Dashboard />,
        path: "/",
      },
      {
        element: <Receitas />,
        path: "/receitas",
      },
      {
        element: <Despesas />,
        path: "/despesas",
      },
      {
        element: <Perfil />,
        path: "/perfil",
      },
      {
        element: <Sair />,
        path: "/sair",
      },
    ],
  },
  {
    element: <Login />,
    path: "/login",
  },
]);
<<<<<<< Updated upstream
=======

export function App() {
  return (
    <AuthProvider>
      <RouterProvider router={routerApp} />
    </AuthProvider>
  );
}

export default App;
>>>>>>> Stashed changes
