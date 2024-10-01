// components/FileUpload.tsx

"use client";

import { Dispatch, SetStateAction } from "react";

interface FileUploadProps {
  setFile: Dispatch<SetStateAction<File | null>>;
}

export default function FileUpload({ setFile }: FileUploadProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div className="mb-4">
      <input
        type="file"
        accept="image/*,audio/*,video/*,.pdf"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                   file:rounded file:border-0 file:text-sm file:font-semibold
                   file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />
    </div>
  );
}
