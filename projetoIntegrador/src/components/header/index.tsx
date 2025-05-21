import Sidebar from "../Sidebar";

export function Header() {
  return (
    <div className="flex h-screen w-screen ">
      <Sidebar />
      <main className="flex-1 p-6 text-white bg-zinc-800">
        <h1 className="text-3xl font-bold">Conteúdo Principal</h1>
      </main>
    </div>
    
  );
}