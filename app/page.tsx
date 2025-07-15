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
          <motion.button
            type="submit"
            className="px-4 py-2 rounded bg-black text-white dark:bg-white dark:text-black font-medium hover:bg-gray-800 dark:hover:bg-neutral-200 transition"
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
          >
            Add
          </motion.button>
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
                exit={{ opacity: 0, x: 40, height: 0, marginTop: 0, marginBottom: 0, paddingTop: 0, paddingBottom: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                layout
                className="flex items-center justify-between bg-gray-100 dark:bg-neutral-800 rounded px-3 py-2 overflow-hidden"
              >
                {todo.editing ? (
                  <motion.form
                    onSubmit={saveEdit}
                    className="flex-1 flex gap-2 items-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.input
                      className="flex-1 px-2 py-1 rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20"
                      type="text"
                      value={editInput}
                      onChange={e => setEditInput(e.target.value)}
                      autoFocus
                      initial={{ scale: 0.95 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    />
                    <motion.button
                      type="submit"
                      className="text-xs px-2 py-1 rounded bg-black text-white dark:bg-white dark:text-black font-medium hover:bg-gray-800 dark:hover:bg-neutral-200 transition"
                      whileTap={{ scale: 0.95 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      Save
                    </motion.button>
                    <motion.button
                      type="button"
                      onClick={cancelEdit}
                      className="text-xs px-2 py-1 rounded bg-gray-200 dark:bg-neutral-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-neutral-600 transition"
                      whileTap={{ scale: 0.95 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      Cancel
                    </motion.button>
                  </motion.form>
                ) : (
                  <>
                    <motion.span
                      className="truncate flex-1"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {todo.text}
                    </motion.span>
                    <div className="flex gap-1 ml-2">
                      <motion.button
                        onClick={() => startEdit(todo.id, todo.text)}
                        className="text-xs text-gray-400 hover:text-blue-500 transition"
                        aria-label="Edit todo"
                        whileTap={{ scale: 0.95 }}
                        whileHover={{ scale: 1.1 }}
                      >
                        Edit
                      </motion.button>
                      <motion.button
                        onClick={() => removeTodo(todo.id)}
                        className="text-xs text-gray-400 hover:text-red-500 transition"
                        aria-label="Remove todo"
                        whileTap={{ scale: 0.95 }}
                        whileHover={{ scale: 1.1 }}
                      >
                        Remove
                      </motion.button>
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
