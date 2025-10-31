import { Response, Request } from "express";
import {
  addToCartService,
  deleteCartItemService,
  getCartByUserServcie,
  updateProductQuantityService,
} from "../services/cart.service";
import { StatusCodes } from "http-status-codes";
import { getCartById } from "../repositories/cart.repository";
import { getCartByUserWithProductDetailsServcie } from "../services/cart.service";
import calculateTotalAmount from "../utils/calculate.helper";

export async function addToCartHandler(req: Request, res: Response) {
  const cartData = await addToCartService(req.body);

  res.status(StatusCodes.CREATED).json({
    success: true,
    message: "Product added to cart successfully",
    data: cartData,
  });
}

export async function deleteCartItemHandler(req: Request, res: Response) {
  const data = await deleteCartItemService(
    req.params.cartId,
    req.params.productId
  );

  res.status(StatusCodes.OK).json({
    success: true,
    message: "Product deleted to cart successfully",
    data: data ? data : [],
  });
}

export async function getCartByUserHandler(req: Request, res: Response) {
  const data = await getCartByUserServcie(req.params.userId);

  res.status(StatusCodes.OK).json({
    success: true,
    message: "Cart details fetched successfully",
    data,
  });
}

export async function getCartByUserWithProductDetailsHandler(
  req: Request,
  res: Response
) {
  const data = await getCartByUserWithProductDetailsServcie(req.params.userId);

  const totalAmount = calculateTotalAmount(data.product);
  res.status(StatusCodes.OK).json({
    success: true,
    message: "Cart details fetched successfully",
    data,
    totalAmount,
  });
}

export async function updateProductQuantityHandler(
  req: Request,
  res: Response
) {
  const { userId, productId, quantity } = req.body;
  const data = await updateProductQuantityService(userId, productId, quantity);

  const totalAmount = calculateTotalAmount(data.product);
  res.status(StatusCodes.OK).json({
    success: true,
    message: "Quantity updated successfully",
    data,
    totalAmount,
  });
}
