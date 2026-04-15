"use client";

import { useState } from "react";

const QUESTION_TYPES = [
  { id: "multiple-choice", name: "Feleletválasztós (4 opció)" },
  { id: "text-input", name: "Szöveges válasz" },
  { id: "ordering", name: "Sorrendbe állítás" },
];

export default function QuestionEditor({ question, onUpdate, onDelete, index }) {
  const handleTypeChange = (e) => {
    const newType = e.target.value;
    onUpdate({ ...question, type: newType, data: getDefaultData(newType) });
  };

  const getDefaultData = (type) => {
    switch (type) {
      case "multiple-choice":
        return { options: ["", "", "", ""], correctAnswerIndex: 0 };
      case "text-input":
        return { answer: "" };
      case "ordering":
        return { items: ["", "", "", ""] };
      default:
        return {};
    }
  };

  const handleUpdateData = (field, value) => {
    onUpdate({
      ...question,
      data: {
        ...question.data,
        [field]: value,
      },
    });
  };

  return (
    <div className="p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg border border-zinc-200 dark:border-zinc-700 shadow-sm flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h4 className="font-semibold text-black dark:text-white">{index + 1}. Kérdés</h4>
        <button
          onClick={onDelete}
          className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors"
        >
          Törlés
        </button>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
          Kérdés szövege
        </label>
        <input
          type="text"
          value={question.text || ""}
          onChange={(e) => onUpdate({ ...question, text: e.target.value })}
          placeholder="Mi a kérdés?"
          className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-900 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
          Kérdés típusa
        </label>
        <select
          value={question.type || "multiple-choice"}
          onChange={handleTypeChange}
          className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-900 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {QUESTION_TYPES.map((type) => (
            <option key={type.id} value={type.id}>
              {type.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-2 pt-4 border-t border-zinc-200 dark:border-zinc-700">
        {question.type === "multiple-choice" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {(question.data?.options || ["", "", "", ""]).map((opt, i) => (
              <div key={i} className="flex flex-col gap-1">
                <label className="text-[10px] text-zinc-400 font-bold">{i + 1}. opció</label>
                <input
                  type="text"
                  value={opt}
                  onChange={(e) => {
                    const newOptions = [...(question.data?.options || ["", "", "", ""])];
                    newOptions[i] = e.target.value;
                    handleUpdateData("options", newOptions);
                  }}
                  className="px-3 py-1.5 border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-900 text-sm"
                />
              </div>
            ))}
          </div>
        )}

        {question.type === "text-input" && (
          <div className="flex flex-col gap-2">
            <label className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">Helyes válasz</label>
            <input
              type="text"
              value={question.data?.answer || ""}
              onChange={(e) => handleUpdateData("answer", e.target.value)}
              placeholder="Írd ide a jó választ..."
              className="w-full px-3 py-1.5 border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-900"
            />
          </div>
        )}

        {question.type === "ordering" && (
          <div className="flex flex-col gap-3">
            <label className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">Helyes sorrend</label>
            {(question.data?.items || ["", "", "", ""]).map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-sm font-bold text-zinc-400 w-4">{i + 1}.</span>
                <input
                  type="text"
                  value={item}
                  onChange={(e) => {
                    const newItems = [...(question.data?.items || ["", "", "", ""])];
                    newItems[i] = e.target.value;
                    handleUpdateData("items", newItems);
                  }}
                  className="flex-1 px-3 py-1.5 border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-900 text-sm"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
