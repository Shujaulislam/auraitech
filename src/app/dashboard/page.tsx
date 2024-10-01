"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import FileUpload from "@/components/Fileupload";
import FilePreview from "@/components/FilePreview";


export default function DashboardPage() {
  const [file, setFile] = useState<File | null>(null);
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(600);

  const { data: session } = useSession();
  console.log(session);
  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("width", width.toString());
    formData.append("height", height.toString());

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      const data = await res.json();
      alert(`File uploaded successfully: ${data.fileName}`);
      setFile(null);
    } else {
      alert("Failed to upload file.");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">
          Welcome, {session?.user?.name}
        </h1>
        <button
          onClick={() => signOut()}
          className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
      <FileUpload setFile={setFile} setWidth={setWidth} setHeight={setHeight} />
      <FilePreview file={file} />
      {file && (
        <button
          onClick={handleUpload}
          className="px-4 py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Confirm Upload
        </button>
      )}
    </div>
  );
}
