// components/Navbar.tsx

"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();
  console.log(session);

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
      <Link href="/" className="text-2xl font-bold text-blue-600">
        File Upload App
      </Link>
      <div>
        {session ? (
          <>
            <span className="mr-4 text-gray-700">
              Hello, {session.user?.name}
            </span>
            <button
              onClick={() => signOut()}
              className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            href="/login"
            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
