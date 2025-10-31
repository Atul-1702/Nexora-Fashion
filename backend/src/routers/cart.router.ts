import express, { Router } from "express";
import {
  addToCartHandler,
  deleteCartItemHandler,
  getCartByUserHandler,
  getCartByUserWithProductDetailsHandler,
  updateProductQuantityHandler,
} from "../controllers/cart.controller";
import { zodSchemaValidator } from "../validators/zod.validator";
import cartZodSchema from "../dto/cart.dto";

const cartRouter: Router = express.Router();

cartRouter.post("/", zodSchemaValidator(cartZodSchema), addToCartHandler);
cartRouter.delete("/:cartId/:productId", deleteCartItemHandler);
cartRouter.get("/:userId", getCartByUserHandler);
cartRouter.get("/product/:userId", getCartByUserWithProductDetailsHandler);
cartRouter.patch("/", updateProductQuantityHandler);

export default cartRouter;
