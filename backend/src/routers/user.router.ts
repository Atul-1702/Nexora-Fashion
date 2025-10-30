import express, { Router } from "express";
import userZodSchema from "../dto/user.dto";
import { zodSchemaValidator } from "../validators/zod.validator";
import {
  createUserHandler,
  getUserHandler,
} from "../controllers/user.controller";
import userLoginZodSchema from "../dto/user-login.dto";

const userRouter: Router = express.Router();

userRouter.post("/", zodSchemaValidator(userZodSchema), createUserHandler);
userRouter.post(
  "/login",
  zodSchemaValidator(userLoginZodSchema),
  getUserHandler
);

export default userRouter;
