import { Request, Response, NextFunction } from "express";
export const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  console.error(
    `[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`,
    err,
  );
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
};
