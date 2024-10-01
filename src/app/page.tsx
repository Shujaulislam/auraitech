// app/page.tsx

"use client";

import Link from "next/link";


export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-r from-blue-500 to-indigo-600">
      <h1 className="mb-4 text-5xl font-extrabold text-center text-white">
        Welcome to the File Upload App
      </h1>
      <p className="mb-8 text-lg text-center text-white">
        Upload, preview, and manipulate your files with ease.
      </p>
      <Link
        href="/login"
        className="px-8 py-4 text-lg font-semibold text-blue-500 bg-white rounded-full shadow-lg hover:bg-gray-100"
      >
        Get Started
      </Link>
    </div>
  );
}
