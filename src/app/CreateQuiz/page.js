"use client";

import { useState } from "react";
import Link from "next/link";

export default function CreateQuizPage() {
  const [step, setStep] = useState(1);
  const [quizName, setQuizName] = useState("");
  const [rounds, setRounds] = useState(1);

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-zinc-50 dark:bg-black">
      <div className="w-full max-w-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-lg p-8">
        {step === 1 && (
          <div className="flex flex-col gap-6">
            <h1 className="text-2xl font-bold text-black dark:text-white">1. Lépés: Alapinfók</h1>
            
            <div className="flex flex-col gap-2">
              <label htmlFor="quizName" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Kvíz neve
              </label>
              <input
                id="quizName"
                type="text"
                value={quizName}
                onChange={(e) => setQuizName(e.target.value)}
                placeholder="Pl. Heti Kvíz"
                className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-transparent text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="rounds" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Fordulók száma
              </label>
              <input
                id="rounds"
                type="number"
                min="1"
                max="20"
                value={rounds}
                onChange={(e) => setRounds(parseInt(e.target.value) || 1)}
                className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-transparent text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        )}

        {step > 1 && (
          <div className="flex flex-col gap-6 items-center">
            <h1 className="text-2xl font-bold text-black dark:text-white">{step}. Lépés</h1>
            <p className="text-zinc-600 dark:text-zinc-400">Következő lépések kidolgozása folyamatban...</p>
          </div>
        )}

        <div className="flex justify-between mt-8 pt-4 border-t border-zinc-100 dark:border-zinc-800">
          {step === 1 ? (
            <Link
              href="/"
              className="px-4 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors"
            >
              Mégse
            </Link>
          ) : (
            <button
              onClick={prevStep}
              className="px-4 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors"
            >
              Vissza
            </button>
          )}

          <button
            onClick={nextStep}
            className="px-6 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Következő
          </button>
        </div>
      </div>
    </div>
  );
}
