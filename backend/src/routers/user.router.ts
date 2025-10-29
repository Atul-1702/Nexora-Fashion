import express, { Router } from "express";
import userZodSchema from "../dto/user.dto";
import { zodSchemaValidator } from "../validators/zod.validator";
import { createUserHandler } from "../controllers/user.controller";

const userRouter: Router = express.Router();

userRouter.post("/", zodSchemaValidator(userZodSchema), createUserHandler);

export default userRouter;
