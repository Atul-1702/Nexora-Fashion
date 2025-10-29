import { Request, Response } from "express";
import { createUserService } from "../services/user.service";
import { StatusCodes } from "http-status-codes";
import { success } from "zod";

export async function createUserHandler(req: Request, res: Response) {
  const userData = await createUserService(req.body);
  res.status(StatusCodes.CREATED).json({
    success: true,
    message: "User created successfully",
    data: userData,
  });
}
