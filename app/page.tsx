"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface Todo {
  id: number;
  text: string;
  editing: boolean;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");
  const [editInput, setEditInput] = useState("");
  const [editId, setEditId] = useState<number | null>(null);

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setTodos([
      { id: Date.now(), text: input.trim(), editing: false },
      ...todos,
    ]);
    setInput("");
  };

  const removeTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const startEdit = (id: number, text: string) => {
    setEditId(id);
    setEditInput(text);
    setTodos(todos.map(todo => todo.id === id ? { ...todo, editing: true } : { ...todo, editing: false }));
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditInput("");
    setTodos(todos.map(todo => ({ ...todo, editing: false })));
  };

  const saveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editId === null || !editInput.trim()) return;
    setTodos(todos.map(todo =>
      todo.id === editId ? { ...todo, text: editInput.trim(), editing: false } : todo
    ));
    setEditId(null);
    setEditInput("");
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
          <AnimatePresence initial={false}>
            {todos.map((todo) => (
              <motion.li
                key={todo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: 40 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                layout
                className="flex items-center justify-between bg-gray-100 dark:bg-neutral-800 rounded px-3 py-2"
              >
                {todo.editing ? (
                  <form onSubmit={saveEdit} className="flex-1 flex gap-2 items-center">
                    <input
                      className="flex-1 px-2 py-1 rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20"
                      type="text"
                      value={editInput}
                      onChange={e => setEditInput(e.target.value)}
                      autoFocus
                    />
                    <button
                      type="submit"
                      className="text-xs px-2 py-1 rounded bg-black text-white dark:bg-white dark:text-black font-medium hover:bg-gray-800 dark:hover:bg-neutral-200 transition"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={cancelEdit}
                      className="text-xs px-2 py-1 rounded bg-gray-200 dark:bg-neutral-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-neutral-600 transition"
                    >
                      Cancel
                    </button>
                  </form>
                ) : (
                  <>
                    <span className="truncate flex-1">{todo.text}</span>
                    <div className="flex gap-1 ml-2">
                      <button
                        onClick={() => startEdit(todo.id, todo.text)}
                        className="text-xs text-gray-400 hover:text-blue-500 transition"
                        aria-label="Edit todo"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => removeTodo(todo.id)}
                        className="text-xs text-gray-400 hover:text-red-500 transition"
                        aria-label="Remove todo"
                      >
                        Remove
                      </button>
                    </div>
                  </>
                )}
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </div>
    </div>
  );
}
