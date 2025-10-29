import mongoose, { MongooseError } from "mongoose";
import AppError, {
  BadRequestError,
  ConflictError,
  InternalServerError,
} from "./app.error";

export function handleMongoError(error: unknown) {
  if (error instanceof mongoose.Error.ValidationError) {
    throw new BadRequestError(error.message);
  } else {
    if (
      error instanceof mongoose.mongo.MongoServerError &&
      error.code === 11000
    ) {
      throw new ConflictError("Duplicate Key: email");
    } else {
      if (error instanceof MongooseError) {
        throw new InternalServerError("Mongo DB error occured.");
      } else {
        throw new InternalServerError("Unknown error occured.");
      }
    }
  }
}
