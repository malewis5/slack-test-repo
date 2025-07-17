"use client";
import { useState } from "react";
import Image from "next/image";

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
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start w-full max-w-md">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <form onSubmit={addTodo} className="flex w-full gap-2">
          <input
            className="flex-1 rounded border border-black/10 dark:border-white/20 px-3 py-2 bg-white dark:bg-black/10 text-black dark:text-white outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20 transition"
            type="text"
            placeholder="Add a todo..."
            value={input}
            onChange={e => setInput(e.target.value)}
          />
          <button
            type="submit"
            className="rounded bg-black text-white px-4 py-2 font-medium hover:bg-neutral-800 transition"
          >
            Add
          </button>
        </form>
        <ul className="w-full mt-4 space-y-2">
          {todos.length === 0 && (
            <li className="text-neutral-400 text-center">No todos yet.</li>
          )}
          {todos.map((todo, idx) => (
            <li key={idx} className="flex items-center justify-between bg-neutral-100 dark:bg-neutral-800 rounded px-3 py-2">
              <span className="truncate">{todo}</span>
              <button
                onClick={() => removeTodo(idx)}
                className="ml-2 text-xs text-neutral-500 hover:text-red-500 transition"
                aria-label="Remove todo"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
