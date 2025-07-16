import React from 'react';

const mockPosts = [
  {
    id: 1,
    title: 'Understanding Next.js 15 App Router',
    summary: 'A quick guide to the new App Router in Next.js 15.',
  },
  {
    id: 2,
    title: 'TailwindCSS Tips for Minimal Design',
    summary: 'How to use TailwindCSS for clean, minimal UIs.',
  },
  {
    id: 3,
    title: 'Static vs Server-side Rendering',
    summary: 'When to use static generation or SSR in your projects.',
  },
];

export default function BlogPage() {
  return (
    <main className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Blog Posts</h1>
      <ul className="space-y-6">
        {mockPosts.map((post) => (
          <li key={post.id} className="border rounded-lg p-6 hover:shadow transition">
            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            <p className="text-gray-500">{post.summary}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
