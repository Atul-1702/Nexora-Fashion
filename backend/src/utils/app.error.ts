import { ReasonPhrases, StatusCodes } from "http-status-codes";

export default interface AppError extends Error {
  statusCode: number;
}

export class BadRequestError implements AppError {
  statusCode: number = StatusCodes.BAD_REQUEST;
  name: string = ReasonPhrases.BAD_REQUEST;
  message: string = "";
  constructor(msg?: string) {
    this.message = msg || ReasonPhrases.BAD_REQUEST;
  }
}

export class InternalServerError implements AppError {
  statusCode: number = StatusCodes.INTERNAL_SERVER_ERROR;
  name: string = ReasonPhrases.INTERNAL_SERVER_ERROR;
  message: string = "";
  constructor(msg?: string) {
    this.message = msg || ReasonPhrases.INTERNAL_SERVER_ERROR;
  }
}

export class ConflictError implements AppError {
  name: string = ReasonPhrases.CONFLICT;
  statusCode: number = StatusCodes.CONFLICT;
  message: string = "";
  constructor(msg?: string) {
    this.message = msg || ReasonPhrases.CONFLICT;
  }
}

export class NotFoundError implements AppError {
  name: string = ReasonPhrases.NOT_FOUND;
  statusCode: number = StatusCodes.NOT_FOUND;
  message: string = "";
  constructor(msg?: string) {
    this.message = msg || ReasonPhrases.NOT_FOUND;
  }
}

export class UnauthorizedError implements AppError {
  name: string = ReasonPhrases.UNAUTHORIZED;
  statusCode: number = StatusCodes.UNAUTHORIZED;
  message: string = "";
  constructor(msg?: string) {
    this.message = msg || ReasonPhrases.UNAUTHORIZED;
  }
}
