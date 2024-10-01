
"use client";

import { signIn } from "next-auth/react";
import { FormEvent, useState } from "react";

export default function LoginPage() {
  const [userInfo, setUserInfo] = useState({ username: "", password: "" });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      username: userInfo.username,
      password: userInfo.password,
      redirect: false,
    });
    if (result?.error) {
      console.error(result.error);
    } else {
      window.location.href = "/dashboard";
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="p-6 bg-white rounded shadow-md w-80"
      >
        <h2 className="mb-4 text-2xl font-semibold text-center">Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={userInfo.username}
          onChange={(e) =>
            setUserInfo({ ...userInfo, username: e.target.value })
          }
          className="w-full p-2 mb-4 border rounded text-black"
        />
        <input
          type="password"
          placeholder="Password"
          value={userInfo.password}
          onChange={(e) =>
            setUserInfo({ ...userInfo, password: e.target.value })
          }
          className="w-full p-2 mb-4 border rounded"
        />
        <button
          type="submit"
          className="w-full p-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Login
        </button>
      </form>
    </div>
  );
}
