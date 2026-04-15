"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { addQuiz, getQuizzes } from "@/lib/quizStore";
import QuestionEditor from "@/components/QuestionEditor";

export default function CreateQuizPage() {
  const [quizzes, setQuizzesState] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingQuizId, setEditingQuizId] = useState(null);
  const [step, setStep] = useState(1);
  const [quizName, setQuizName] = useState("");
  const [rounds, setRounds] = useState([]); // Array of round objects
  const [activeRoundIndex, setActiveRoundIndex] = useState(0);

  useEffect(() => {
    setQuizzesState(getQuizzes());
  }, []);

  const handleEditQuiz = (quiz) => {
    setEditingQuizId(quiz.id);
    setQuizName(quiz.name);
    setRounds(quiz.rounds || []);
    setActiveRoundIndex(0);
    setStep(1);
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setIsModalOpen(false);
    setEditingQuizId(null);
    setStep(1);
    setQuizName("");
    setRounds([]);
    setActiveRoundIndex(0);
  };

  const handleAddRound = () => {
    if (rounds.length >= 10) return;
    setRounds((prev) => [
      ...prev,
      { name: `Új forduló ${prev.length + 1}`, description: "", questions: [] }
    ]);
    setActiveRoundIndex(rounds.length);
  };

  const handleDeleteRound = (index) => {
    setRounds((prev) => {
      const newRounds = prev.filter((_, i) => i !== index);
      if (activeRoundIndex >= newRounds.length && newRounds.length > 0) {
        setActiveRoundIndex(newRounds.length - 1);
      } else if (newRounds.length === 0) {
        setActiveRoundIndex(0);
      }
      return newRounds;
    });
  };

  const handleRoundChange = (roundIndex, field, value) => {
    setRounds((prev) => {
      const newRounds = [...prev];
      newRounds[roundIndex] = { ...newRounds[roundIndex], [field]: value };
      return newRounds;
    });
  };

  const handleUpdateRoundQuestion = (roundIndex, questionIndex, updatedQuestion) => {
    setRounds((prev) => {
      const newRounds = [...prev];
      const newQuestions = [...(newRounds[roundIndex]?.questions || [])];
      newQuestions[questionIndex] = updatedQuestion;
      newRounds[roundIndex] = { ...newRounds[roundIndex], questions: newQuestions };
      return newRounds;
    });
  };

  const handleAddQuestion = (roundIndex) => {
    setRounds((prev) => {
      const newRounds = [...prev];
      const newQuestions = [
        ...(newRounds[roundIndex]?.questions || []),
        { text: "", type: "multiple-choice", data: { options: ["", "", "", ""], correctAnswerIndex: 0 } }
      ];
      newRounds[roundIndex] = { ...newRounds[roundIndex], questions: newQuestions };
      return newRounds;
    });
  };

  const handleDeleteQuestion = (roundIndex, questionIndex) => {
    setRounds((prev) => {
      const newRounds = [...prev];
      const newQuestions = (newRounds[roundIndex]?.questions || []).filter((_, i) => i !== questionIndex);
      newRounds[roundIndex] = { ...newRounds[roundIndex], questions: newQuestions };
      return newRounds;
    });
  };

  const handleFinish = () => {
    const newQuiz = {
      id: editingQuizId || Date.now(),
      name: quizName,
      rounds: rounds,
    };
    addQuiz(newQuiz);
    setQuizzesState(getQuizzes());
    resetForm();
  };

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
            <p className="text-zinc-600 dark:text-zinc-400">{(quiz.rounds || []).length} kör</p>
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
          <div className="w-full max-w-5xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-2xl flex flex-col md:flex-row max-h-[90vh] overflow-hidden">
            {/* Sidebar for rounds */}
            {step === 2 && (
              <div className="w-full md:w-64 bg-zinc-50 dark:bg-zinc-800/50 border-r border-zinc-100 dark:border-zinc-800 p-4 overflow-y-auto">
                <h3 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-4 px-2 flex justify-between items-center">
                  <span>Körök listája</span>
                  <span className="text-xs font-normal lowercase">({rounds.length}/10)</span>
                </h3>
                <div className="flex flex-col gap-2">
                  {rounds.map((round, idx) => (
                    <div key={idx} className="group relative">
                      <button
                        onClick={() => setActiveRoundIndex(idx)}
                        className={`w-full px-4 py-2 pr-8 text-left rounded-lg text-sm font-medium transition-all ${
                          activeRoundIndex === idx
                            ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                            : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                        }`}
                      >
                        {idx + 1}. {round.name || "Névtelen kör"}
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteRound(idx);
                        }}
                        className={`absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity ${
                          activeRoundIndex === idx ? "text-blue-200 hover:text-white hover:bg-blue-500" : "text-zinc-400 hover:text-red-500 hover:bg-zinc-100 dark:hover:bg-zinc-600"
                        }`}
                        title="Forduló törlése"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  ))}
                  {rounds.length < 10 && (
                    <button
                      onClick={handleAddRound}
                      className="w-full px-4 py-2 mt-2 text-left rounded-lg text-sm font-semibold text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 border border-dashed border-blue-200 dark:border-blue-800 transition-all flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      Új kör
                    </button>
                  )}
                </div>
              </div>
            )}

            <div className="flex-1 p-8 overflow-y-auto">
              {step === 1 && (
                <div className="flex flex-col gap-6 max-w-2xl mx-auto">
                  <h1 className="text-2xl font-bold text-black dark:text-white">Alapinfók</h1>
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
                  <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/10 rounded-lg border border-blue-100 dark:border-blue-900/20">
                    <p className="text-sm text-blue-700 dark:text-blue-400">
                      A következő lépésben tudod majd hozzáadni a köröket és a kérdéseket dinamikusan.
                    </p>
                  </div>
                </div>
              )}

              {step === 2 && rounds.length > 0 && (
                <div className="flex flex-col gap-6">
                  <div className="flex justify-between items-center mb-2">
                    <h1 className="text-2xl font-bold text-black dark:text-white text-wrap">
                      {activeRoundIndex + 1}. Forduló szerkesztése
                    </h1>
                  </div>

                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                        Forduló neve / Témája
                      </label>
                      <input
                        type="text"
                        value={rounds[activeRoundIndex]?.name || ""}
                        onChange={(e) => handleRoundChange(activeRoundIndex, "name", e.target.value)}
                        className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-transparent text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                        Leírás (opcionális)
                      </label>
                      <textarea
                        value={rounds[activeRoundIndex]?.description || ""}
                        onChange={(e) => handleRoundChange(activeRoundIndex, "description", e.target.value)}
                        className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-transparent text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[80px]"
                      />
                    </div>

                    <div className="flex flex-col gap-6 mt-4">
                      <div className="flex justify-between items-center border-b border-zinc-200 dark:border-zinc-700 pb-2">
                        <h3 className="text-xl font-bold text-black dark:text-white text-wrap">Kérdések</h3>
                        <button
                          onClick={() => handleAddQuestion(activeRoundIndex)}
                          className="px-4 py-1.5 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-lg transition-colors flex items-center gap-1"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                          Kérdés hozzáadása
                        </button>
                      </div>

                      {(rounds[activeRoundIndex]?.questions || []).length === 0 ? (
                        <p className="text-center py-8 text-zinc-500 italic">Még nincsenek kérdések ebben a fordulóban.</p>
                      ) : (
                        <div className="flex flex-col gap-8">
                          {(rounds[activeRoundIndex].questions).map((q, qIndex) => (
                            <QuestionEditor
                              key={qIndex}
                              index={qIndex}
                              question={q}
                              onUpdate={(updated) => handleUpdateRoundQuestion(activeRoundIndex, qIndex, updated)}
                              onDelete={() => handleDeleteQuestion(activeRoundIndex, qIndex)}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && rounds.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <p className="text-zinc-500 dark:text-zinc-400 mb-6">Még nincs hozzáadva egyetlen kör sem.</p>
                  <button
                    onClick={handleAddRound}
                    className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all flex items-center gap-2"
                  >
                    Első kör hozzáadása
                  </button>
                </div>
              )}

              <div className="flex justify-between mt-12 pt-6 border-t border-zinc-100 dark:border-zinc-800">
                <button
                  onClick={() => {
                    if (step === 1) setIsModalOpen(false);
                    else setStep(1);
                  }}
                  className="px-4 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors"
                >
                  {step === 1 ? "Mégse" : "Vissza"}
                </button>

                <div className="flex gap-4">
                  {step === 1 ? (
                    <button
                      onClick={() => setStep(2)}
                      disabled={!quizName}
                      className="px-6 py-2 bg-blue-600 disabled:opacity-50 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Körök hozzáadása
                    </button>
                  ) : (
                    <button
                      onClick={handleFinish}
                      disabled={rounds.length === 0}
                      className="px-6 py-2 bg-green-600 disabled:opacity-50 text-white text-sm font-semibold rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Kvíz mentése
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
