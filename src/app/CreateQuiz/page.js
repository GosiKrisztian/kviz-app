"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { addQuiz, getQuizzes } from "@/lib/quizStore";

export default function CreateQuizPage() {
  const [quizzes, setQuizzesState] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingQuizId, setEditingQuizId] = useState(null);
  const [step, setStep] = useState(1);
  const [quizName, setQuizName] = useState("");
  const [rounds, setRounds] = useState(1);
  const [roundDetails, setRoundDetails] = useState({});

  useEffect(() => {
    setQuizzesState(getQuizzes());
  }, []);

  const nextStep = () => {
    if (step <= rounds) {
      setStep((prev) => prev + 1);
    } else if (step === rounds + 1) {
      handleFinish();
    }
  };
  const prevStep = () => setStep((prev) => prev - 1);

  const goToRound = (roundNumber) => {
    setStep(roundNumber + 1);
  };

  const handleEditQuiz = (quiz) => {
    setEditingQuizId(quiz.id);
    setQuizName(quiz.name);
    setRounds(quiz.rounds);
    setRoundDetails(quiz.details);
    setStep(1);
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setIsModalOpen(false);
    setEditingQuizId(null);
    setStep(1);
    setQuizName("");
    setRounds(1);
    setRoundDetails({});
  };

  const handleRoundChange = (roundIndex, field, value) => {
    setRoundDetails((prev) => ({
      ...prev,
      [roundIndex]: {
        ...prev[roundIndex],
        [field]: value,
      },
    }));
  };

  const handleQuestionChange = (roundIndex, questionIndex, value) => {
    setRoundDetails((prev) => {
      const currentQuestions = prev[roundIndex]?.questions || {};
      return {
        ...prev,
        [roundIndex]: {
          ...prev[roundIndex],
          questions: {
            ...currentQuestions,
            [questionIndex]: value,
          },
        },
      };
    });
  };

  const handleFinish = () => {
    const newQuiz = {
      id: editingQuizId || Date.now(),
      name: quizName,
      rounds: rounds,
      details: roundDetails,
    };
    addQuiz(newQuiz);
    setQuizzesState(getQuizzes());
    resetForm();
  };

  const roundTypes = [
    { id: "single-choice", name: "Feleletválasztós (1 jó válasz)" },
    { id: "text-answer", name: "Szöveges válasz" },
    { id: "ordering", name: "Sorrendbe állítás" },
  ];

  return (
    <div className="flex flex-col flex-1 p-8 bg-zinc-50 dark:bg-black overflow-y-auto">
      <h1 className="text-3xl font-bold text-black dark:text-white mb-8">Kvíz készítése</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {quizzes.map((quiz) => (
          <div
            key={quiz.id}
            onClick={() => handleEditQuiz(quiz)}
            className="flex flex-col p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer"
          >
            <h3 className="text-xl font-bold text-black dark:text-white mb-2">{quiz.name}</h3>
            <p className="text-zinc-600 dark:text-zinc-400">{quiz.rounds} kör</p>
          </div>
        ))}

        <button
          onClick={() => {
            resetForm();
            setIsModalOpen(true);
          }}
          className="flex flex-col items-center justify-center min-h-[200px] p-6 bg-white dark:bg-zinc-900 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl hover:border-blue-500 dark:hover:border-blue-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all group"
        >
          <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center mb-4 group-hover:bg-blue-100 dark:group-hover:bg-blue-800/30 transition-colors">
            <svg
              className="w-6 h-6 text-blue-600 dark:text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400 group-hover:text-blue-600 dark:group-hover:text-blue-400">Új kvíz létrehozása</span>
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-2xl p-8 max-h-[90vh] overflow-y-auto">
            {step > 1 && step <= rounds + 1 && (
              <div className="flex flex-wrap gap-2 mb-8 p-3 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
                {Array.from({ length: rounds }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goToRound(i + 1)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                      step === i + 2
                        ? "bg-blue-600 text-white"
                        : "bg-white dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300 hover:bg-blue-100 dark:hover:bg-zinc-600"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}

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
                    Körök száma (Max: 10)
                  </label>
                  <input
                    id="rounds"
                    type="number"
                    min="1"
                    max="10"
                    value={rounds}
                    onChange={(e) => {
                      const val = parseInt(e.target.value) || 1;
                      setRounds(val > 10 ? 10 : val);
                    }}
                    className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-transparent text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            )}

            {step > 1 && step <= rounds + 1 && (
              <div className="flex flex-col gap-6">
                <h1 className="text-2xl font-bold text-black dark:text-white">
                  {step - 1}. Kör
                </h1>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                      Kör neve / Témája
                    </label>
                    <input
                      type="text"
                      value={roundDetails[step - 1]?.name || ""}
                      onChange={(e) => handleRoundChange(step - 1, "name", e.target.value)}
                      placeholder={`Milyen témájú a(z) ${step - 1}. kör?`}
                      className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-transparent text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                      Kérdések száma (Max: 10)
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={roundDetails[step - 1]?.questionCount || 1}
                      onChange={(e) => {
                        const val = parseInt(e.target.value) || 1;
                        handleRoundChange(step - 1, "questionCount", val > 10 ? 10 : val);
                      }}
                      className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-transparent text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                      Kör típusa
                    </label>
                    <select
                      value={roundDetails[step - 1]?.type || ""}
                      onChange={(e) => handleRoundChange(step - 1, "type", e.target.value)}
                      className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-transparent text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-800"
                    >
                      <option value="" disabled>Válassz típust...</option>
                      {roundTypes.map((type) => (
                        <option key={type.id} value={type.id}>
                          {type.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                      Leírás (opcionális)
                    </label>
                    <textarea
                      value={roundDetails[step - 1]?.description || ""}
                      onChange={(e) => handleRoundChange(step - 1, "description", e.target.value)}
                      className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-transparent text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[80px]"
                    />
                  </div>

                  {roundDetails[step - 1]?.questionCount > 0 && (
                    <div className="flex flex-col gap-4 mt-4 p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg">
                      <h3 className="text-lg font-semibold text-black dark:text-white">Kérdések</h3>
                      {Array.from({ length: roundDetails[step - 1].questionCount }).map((_, i) => (
                        <div key={i} className="flex flex-col gap-1">
                          <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                            {i + 1}. Kérdés
                          </label>
                          <input
                            type="text"
                            value={roundDetails[step - 1]?.questions?.[i] || ""}
                            onChange={(e) => handleQuestionChange(step - 1, i, e.target.value)}
                            placeholder={`${i + 1}. kérdés szövege...`}
                            className="w-full px-3 py-1.5 border border-zinc-300 dark:border-zinc-700 rounded-md bg-transparent text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {step > rounds + 1 && (
              <div className="flex flex-col gap-6 items-center">
                <h1 className="text-2xl font-bold text-black dark:text-white">Kész!</h1>
                <p className="text-zinc-600 dark:text-zinc-400 text-center">
                  A(z) "{quizName}" kvíz adatai készen állnak {rounds} körrel.
                </p>
              </div>
            )}

            <div className="flex justify-between mt-8 pt-4 border-t border-zinc-100 dark:border-zinc-800">
              <button
                onClick={() => {
                  if (step === 1) setIsModalOpen(false);
                  else prevStep();
                }}
                className="px-4 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors"
              >
                {step === 1 ? "Mégse" : "Vissza"}
              </button>

              <button
                onClick={step > rounds + 1 ? handleFinish : nextStep}
                className="px-6 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                {step === rounds + 1 ? "Befejezés" : step > rounds + 1 ? "Mentés" : "Következő"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
