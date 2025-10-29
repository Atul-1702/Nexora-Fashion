import { Response, Request } from "express";
import {
  addToCartService,
  deleteCartItemService,
} from "../services/cart.service";
import { StatusCodes } from "http-status-codes";
import { getCartById } from "../repositories/cart.repository";

export async function addToCartHandler(req: Request, res: Response) {
  const cartData = await addToCartService(req.body);

  res.status(StatusCodes.CREATED).json({
    success: true,
    message: "Product added to cart successfully",
    data: cartData,
  });
}

export async function deleteCartItemHandler(req: Request, res: Response) {
  // console.log(req.params);
  const data = await deleteCartItemService(
    req.params.cartId,
    req.params.productId
  );

  res.status(StatusCodes.OK).json({
    success: true,
    message: "Product deleted to cart successfully",
    data,
  });
}
