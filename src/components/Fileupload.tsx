"use client";

import { Dispatch, SetStateAction } from "react";

interface FileUploadProps {
  setFile: Dispatch<SetStateAction<File | null>>;
  setWidth: Dispatch<SetStateAction<number>>;
  setHeight: Dispatch<SetStateAction<number>>;
}

export default function FileUpload({ setFile, setWidth, setHeight }: FileUploadProps) {
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
      <div className="flex space-x-4 mt-4">
        <input
          type="number"
          placeholder="Width"
          onChange={(e) => setWidth(Number(e.target.value))}
          className="block w-1/2 px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <input
          type="number"
          placeholder="Height"
          onChange={(e) => setHeight(Number(e.target.value))}
          className="block w-1/2 px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
    </div>
  );
}
