import { useState } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/Card2";
import { FormReceita } from "../components/ui/formReceita";

export default function Despesas() {
  const [tab, setTab] = useState("lista");
  const [showModal, setShowModal] = useState(false);
  const despesas = [
    { descricao: "Condomínio", valor: 800, imovel: "Apartamento Centro" },
    {
      descricao: "Manutenção Ar Condicionado",
      valor: 450,
      imovel: "Apartamento Centro",
    },
    { descricao: "IPTU", valor: 350, imovel: "Casa Jardim" },
  ];

  return (
    <div className="p-6 w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Despesas</h1>
        <Button
          className="flex items-center gap-2 bg-green-600 text-white cursor-pointer hover:bg-green-700"
          onClick={() => setShowModal(true)}
        >
          <span className="mr-2">+</span> Nova Despesa
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-zinc-500 mb-2">IPTU Total</p>
            <h2 className="text-2xl font-bold text-red-500">R$ 4.200,00</h2>
            <p className="text-sm text-zinc-600 mt-2">
              Pago: R$ 2.100,00{" "}
              <span className="text-red-500 ml-2">Pendente: R$ 2.100,00</span>
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-zinc-500 mb-2">
              Imposto de Renda (Estimado)
            </p>
            <h2 className="text-2xl font-bold text-red-500">R$ 12.000,00</h2>
            <p className="text-sm text-zinc-600 mt-2">
              Pago: R$ 6.000,00{" "}
              <span className="text-red-500 ml-2">Pendente: R$ 6.000,00</span>
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-zinc-500 mb-2">Total de Impostos</p>
            <h2 className="text-2xl font-bold text-red-500">R$ 16.200,00</h2>
            <p className="text-sm text-zinc-600 mt-2">
              Pago: R$ 8.100,00{" "}
              <span className="text-red-500 ml-2">Pendente: R$ 8.100,00</span>
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-xl font-semibold mb-4">Lista de Despesas</h2>

        <div className="flex gap-2 mb-4">
          <Button
            className={`px-4 py-2 rounded ${
              tab === "lista"
                ? "bg-black text-white"
                : "bg-zinc-200 text-zinc-700 hover:bg-zinc-300"
            }`}
            onClick={() => setTab("lista")}
          >
            Lista
          </Button>
          <Button
            className={`px-4 py-2 rounded ${
              tab === "detalhada"
                ? "bg-black text-white"
                : "bg-zinc-200 text-zinc-700 hover:bg-zinc-300"
            }`}
            onClick={() => setTab("detalhada")}
          >
            Detalhada
          </Button>
        </div>

        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-zinc-500 border-b">
              <th className="py-2">Descrição</th>
              <th className="py-2">Bravura</th>
              <th className="py-2">Imóvel</th>
            </tr>
          </thead>
          <tbody>
            {despesas.map((item, index) => (
              <tr key={index} className="border-b text-sm">
                <td className="py-2">{item.descricao}</td>
                <td className="py-2 text-red-500">
                  R$ {item.valor.toFixed(2).replace(".", ",")}
                </td>
                <td className="py-2">{item.imovel}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showModal && <FormReceita type="despesa" setShowModal={setShowModal} />}
    </div>
  );
}