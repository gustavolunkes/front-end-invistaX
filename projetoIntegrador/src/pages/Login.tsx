import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContexts";
import { useContext, useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await login(email, senha);
      navigate("/");
    } catch (error) {
    } finally {
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <header className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-gray-800">Investimento X</h1>
          <h4 className="text-sm text-gray-500 mt-2">
            Entre com suas credenciais para acessar o sistema
          </h4>
        </header>

        <main className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              id="email"
              placeholder="nome@exemplo.com"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="senha"
              className="block text-sm font-medium text-gray-700"
            >
              Senha
            </label>
            <input
              onChange={(e) => setSenha(e.target.value)}
              type="password"
              id="senha"
              placeholder="........"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            onClick={handleSubmit}
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Entrar
          </button>
        </main>
      </div>
    </div>
  );
}
