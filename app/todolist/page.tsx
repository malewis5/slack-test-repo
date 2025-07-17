import React from 'react';

export default function TodoList() {
  return (
    <main className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      <ul className="space-y-2">
        <li className="flex items-center justify-between p-2 border rounded">
          <span>Sample Todo Item</span>
          <button className="text-xs text-red-500 hover:underline">Delete</button>
        </li>
      </ul>
      <form className="mt-6 flex gap-2">
        <input
          type="text"
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
