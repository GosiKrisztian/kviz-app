"use client";

import { useEffect, useState } from "react";
import { getQuizzes } from "@/lib/quizStore";

export default function PlayQuizPage() {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    setQuizzes(getQuizzes());
  }, []);

  return (
    <div className="flex flex-col flex-1 p-8 bg-zinc-50 dark:bg-black overflow-y-auto">
      <h1 className="text-3xl font-bold text-black dark:text-white mb-8">Elérhető kvízek</h1>
      
      {quizzes.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 text-zinc-500 dark:text-zinc-500 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl">
          <p className="text-lg">Még nincs létrehozott kvíz.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizzes.map((quiz) => (
            <div
              key={quiz.id}
              className="p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            >
              <h2 className="text-xl font-bold text-black dark:text-white mb-2">{quiz.name}</h2>
              <div className="flex items-center text-sm text-zinc-600 dark:text-zinc-400">
                <span>{quiz.rounds} kör</span>
                <span className="mx-2">•</span>
                <span>Ready to play</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
