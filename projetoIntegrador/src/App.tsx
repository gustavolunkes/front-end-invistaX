import { createBrowserRouter } from "react-router-dom";
import Perfil from "./pages/Perfil";
import { Layout } from "./components/layout";
import Imoveis from "./pages/Imoveis";
import Receitas from "./pages/Receitas";
import Despesas from "./pages/Despesas";
import Login from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { DetalhesImovel } from "./components/imoveis/ImoveisDetalhes";
import Proprietarios from "./pages/Proprietarios";

export const routerApp = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        element: <Imoveis />,
        path: "/imoveis",
      },
      {
        element: <DetalhesImovel />,
        path: "/imoveis/:id",
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
        element: <Proprietarios />,
        path: "/proprietarios",
      },
      {
        element: <Perfil />,
        path: "/perfil",
      },
    ],
  },
  {
    element: <Login />,
    path: "/login",
  },
]);
