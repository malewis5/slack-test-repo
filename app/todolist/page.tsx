"use client";
import React, { useState } from 'react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setTodos([
      ...todos,
      { id: Date.now(), text: input.trim(), completed: false },
    ]);
    setInput("");
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleToggle = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <main className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      <ul className="space-y-2">
        {todos.length === 0 && (
          <li className="text-gray-400 text-center">No todos yet.</li>
        )}
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center justify-between p-2 border rounded"
          >
            <button
              className={`flex-1 text-left focus:outline-none ${
                todo.completed ? 'line-through text-gray-400' : ''
              }`}
              onClick={() => handleToggle(todo.id)}
              aria-label={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
            >
              {todo.text}
            </button>
            <button
              className="ml-4 text-xs text-red-500 hover:underline"
              onClick={() => handleDelete(todo.id)}
              aria-label="Delete todo"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <form className="mt-6 flex gap-2" onSubmit={handleAdd}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new todo..."
          className="flex-1 px-3 py-2 border rounded focus:outline-none focus:ring"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
        >
          Add
        </button>
      </form>
    </main>
  );
}
