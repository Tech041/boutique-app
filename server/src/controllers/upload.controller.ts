import { NextFunction, Request, Response } from "express";
import Busboy from "busboy";
import { uploadProductService } from "../services/upload.service";
import ErrorHandler from "../utils/errorHandler";

export const uploadProductController = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const busboy = Busboy({ headers: req.headers });
  let fileBuffer: Buffer | null = null;
  const fields: Record<string, any> = {};

  busboy.on("file", (_name, file) => {
    const chunks: Buffer[] = [];
    file.on("data", (chunk) => chunks.push(chunk));
    file.on("end", () => (fileBuffer = Buffer.concat(chunks)));
  });

  busboy.on("field", (name, value) => (fields[name] = value));

  busboy.on("finish", async () => {
    try {
      if (!fileBuffer)
        return res.status(400).json({ error: "No file uploaded" });

      const product = await uploadProductService({
        ...fields,
        imageBuffer: fileBuffer,
        sizes: JSON.parse(fields.sizes),
      });

      return res.status(201).json({ success: true, product });
    } catch (error: any) {
      console.log("upload error", error);
      if (error instanceof ErrorHandler) {
        return next(error);
      }

      // Handle Mongo duplicate key error
      if (error.code === 11000) {
        const field = Object.keys(error.keyValue)[1];
        return next(new ErrorHandler(400, `This brand already exists`));
      }

      // Handle Mongoose validation errors
      if (error.name === "ValidationError") {
        return next(new ErrorHandler(400, "Validation failed"));
      }

      // Fallback
      return next(new ErrorHandler(500, "Internal Server Error"));
    }
  });

  req.pipe(busboy);
};
