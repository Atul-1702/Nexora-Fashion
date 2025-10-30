import { Request, Response } from "express";
import { createUserService, getUserService } from "../services/user.service";
import { StatusCodes } from "http-status-codes";

export async function createUserHandler(req: Request, res: Response) {
  const userData = await createUserService(req.body);
  res.status(StatusCodes.CREATED).json({
    success: true,
    message: "User created successfully",
    data: userData,
  });
}

export async function getUserHandler(req: Request, res: Response) {
  const [token, userId] = await getUserService(req.body);

  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 24 * 1000 * 60 * 60,
    secure: false,
  });

  res.status(StatusCodes.OK).json({
    success: true,
    message: "User logged in successfully.",
    userId,
  });
}
