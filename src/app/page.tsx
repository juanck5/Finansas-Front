import AllMovements from "@/components/movimientos/all";


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10">
      <h1 className="text-2xl font-bold">Resumen</h1>
      <h2 className="text-2xl font-bold">Listado de movimientos</h2>
      <AllMovements />
    </main>
  );
}
