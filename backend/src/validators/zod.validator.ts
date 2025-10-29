import { NextFunction, Request, Response } from "express";
import { ZodError, ZodType } from "zod";
import { BadRequestError, InternalServerError } from "../utils/app.error";

export function zodSchemaValidator(zodSchema: ZodType) {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      zodSchema.parse(req.body);
      next();
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        const message: string = error.issues
          .map((err) => {
            return err.path + " " + err.message;
          })
          .join(", ");
        throw new BadRequestError(message);
      }
      throw new InternalServerError();
    }
  };
}
