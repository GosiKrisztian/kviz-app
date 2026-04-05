import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-col items-center gap-8 p-8">
        <h1 className="text-4xl font-bold text-black dark:text-white">Kvíz Alkalmazás</h1>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link 
            href="/CreateQuiz"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            Új kvíz létrehozása
          </Link>
          <Link 
            href="/PlayQuiz"
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
          >
            Kvíz kitöltése
          </Link>
        </div>
      </main>
    </div>
  );
}
