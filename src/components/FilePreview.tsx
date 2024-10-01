
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface FilePreviewProps {
  file: File | null;
}

export default function FilePreview({ file }: FilePreviewProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>("");

  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setPreviewUrl("tooLarge");
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  if (!file) return null;
  if (previewUrl === "tooLarge")
    return <p className="text-red-500">File too large for preview.</p>;

  const fileType = file.type.split("/")[0];

  switch (fileType) {
    case "image":
      return (
        <Image
          src={previewUrl || ""}
          alt="Preview"
          width={500}
          height={300}
          className="max-w-full h-auto rounded shadow"
          objectFit="contain"
        />
      );
    case "video":
      return (
        <video controls className="max-w-full h-auto rounded shadow">
          <source src={previewUrl || undefined} type={file.type} />
        </video>
      );
    case "audio":
      return (
        <audio controls className="w-full">
          <source src={previewUrl || undefined} type={file.type} />
        </audio>
      );
    case "application":
      if (file.type === "application/pdf") {
        return (
          <iframe
            src={previewUrl || undefined}
            className="w-full h-96 border rounded"
            title="PDF Preview"
          ></iframe>
        );
      }
      return <p>Cannot preview this application file.</p>;
    default:
      return <p>Cannot preview this file type.</p>;
  }
}
