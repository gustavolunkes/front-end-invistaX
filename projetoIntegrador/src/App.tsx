import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import Perfil from "./pages/Perfil";
import "./App.css";
import { Layout } from "./components/layout";
import ImovelCrud from "./pages/Imoveis";
import Receitas from "./pages/Receitas";
import Despesas from "./pages/Despesas";
import Sair from "./pages/Sair";
import Login from "./pages/Login";
import { Dashboard } from "./pages/dashboard";
import { AuthProvider } from "./contexts/AuthContexts";

export const routerApp = createBrowserRouter([
  { 
    element: <Layout />,
    children: [
      {
        element: <ImovelCrud />,
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

export function App() {
  return (
    <AuthProvider>
      <RouterProvider router={routerApp} />
    </AuthProvider>
  );
}

export default App;
