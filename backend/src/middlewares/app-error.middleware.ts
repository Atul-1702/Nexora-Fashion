import { Response, Request, NextFunction } from "express";
import AppError from "../utils/app.error";

export default function AppErrorMiddleware(
  error: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const code: number = error.statusCode || 500;
  const message: string = error.message || "Something went wrong.";

  res.status(code).json({
    success: false,
    message: message,
    data: error.stack,
  });
}
