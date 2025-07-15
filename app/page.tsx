"use client";
import { useState } from "react";

export default function Home() {
  const [todos, setTodos] = useState<string[]>([]);
  const [input, setInput] = useState("");

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setTodos([input.trim(), ...todos]);
    setInput("");
  };

  const removeTodo = (idx: number) => {
    setTodos(todos.filter((_, i) => i !== idx));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-black px-4">
      <div className="w-full max-w-md bg-white dark:bg-neutral-900 rounded-xl shadow p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Todo List</h1>
        <form onSubmit={addTodo} className="flex gap-2 mb-6">
          <input
            className="flex-1 px-3 py-2 rounded border border-gray-200 dark:border-neutral-700 bg-gray-100 dark:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20"
            type="text"
            placeholder="Add a new todo..."
            value={input}
            onChange={e => setInput(e.target.value)}
          />
          <button
            type="submit"
            className="px-4 py-2 rounded bg-black text-white dark:bg-white dark:text-black font-medium hover:bg-gray-800 dark:hover:bg-neutral-200 transition"
          >
            Add
          </button>
        </form>
        <ul className="space-y-2">
          {todos.length === 0 && (
            <li className="text-gray-400 text-center">No todos yet.</li>
          )}
          {todos.map((todo, idx) => (
            <li key={idx} className="flex items-center justify-between bg-gray-100 dark:bg-neutral-800 rounded px-3 py-2">
              <span className="truncate">{todo}</span>
              <button
                onClick={() => removeTodo(idx)}
                className="ml-2 text-xs text-gray-400 hover:text-red-500 transition"
                aria-label="Remove todo"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
