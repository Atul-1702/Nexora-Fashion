import { Response, Request, NextFunction } from "express";

export default function UncaughtErrorMiddleware(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const code: number = 500;
  const message: string = error.message || "Internal server error.";

  res.status(code).json({
    success: false,
    message: message,
    data: error.stack,
  });
}
