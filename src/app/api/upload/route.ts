import { NextResponse } from "next/server";
// import multer from "multer";
import { promises as fs } from "fs";
import path from "path";
import sharp from "sharp";

// const upload = multer({ dest: "uploads/" });

export const POST = async (req: Request) => {
  const formData = await req.formData();
  const file = formData.get("file") as File;
  const width = Number(formData.get("width"));
  const height = Number(formData.get("height"));

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const uploadsDir = path.join(process.cwd(), "uploads");

  await fs.mkdir(uploadsDir, { recursive: true });
  const filePath = path.join(uploadsDir, file.name);

  // Save the file
  await fs.writeFile(filePath, buffer);

  // Image manipulation if the file is an image
  if (file.type.startsWith("image/")) {
    const manipulatedPath = path.join(uploadsDir, `edited-${file.name}`);

    await sharp(buffer)
      .resize(width, height, { fit: "inside" })
      .toFile(manipulatedPath);

    return NextResponse.json({
      message: "Image uploaded and resized",
      fileName: `edited-${file.name}`,
    });
  }

  return NextResponse.json({ message: "File uploaded", fileName: file.name });
};
