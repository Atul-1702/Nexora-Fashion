import { Request, Response } from "express";
import { addProductService } from "../services/product.service";
import { StatusCodes } from "http-status-codes";

export async function addProductHandler(req: Request, res: Response) {
  const product = await addProductService(req.body);

  res.status(StatusCodes.CREATED).json({
    success: true,
    message: "Product added successfully.",
    data: product,
  });
}
