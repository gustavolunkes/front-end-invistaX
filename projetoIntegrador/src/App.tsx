import { createBrowserRouter } from "react-router-dom";
import Perfil from "./pages/Perfil";
import './App.css'
import { Layout } from "./components/layout";
import Imoveis from "./pages/Imoveis";
import Receitas from "./pages/Receitas";
import Despesas from "./pages/Despesas";
import Sair from "./pages/Sair";

export const routerApp = createBrowserRouter([
  {
    element: <Layout/>,
    children: [
      {
        element: <Imoveis/>,
        path: "/imoveis"
      },
      {
        element: <Receitas/>,
        path: "/receitas"
      },
      {
        element: <Despesas/>,
        path: "/despesas"
      },
      {
        element: <Perfil/>,
        path: "/perfil"
      },
      {
        element: <Sair/>,
        path: "/sair"
      },
    ]
  }
  
])
