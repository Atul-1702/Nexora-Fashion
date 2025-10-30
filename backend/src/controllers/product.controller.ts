import { Request, Response } from "express";
import {
  addProductService,
  getAllProductsService,
  getProductByCategoryService,
} from "../services/product.service";
import { StatusCodes } from "http-status-codes";

export async function addProductHandler(req: Request, res: Response) {
  const product = await addProductService(req.body);

  res.status(StatusCodes.CREATED).json({
    success: true,
    message: "Product added successfully.",
    data: product,
  });
}

export async function getAllProductsHandler(req: Request, res: Response) {
  const allProducts = await getAllProductsService();

  res.status(StatusCodes.OK).json({
    success: true,
    message: "Product fetched successfully.",
    data: allProducts,
  });
}

export async function getProductByCategoryHandler(req: Request, res: Response) {
  const data = await getProductByCategoryService(req.params.category);

  res.status(StatusCodes.OK).json({
    success: true,
    message: "Product fetched successfully.",
    data,
  });
}
