import express, { Router } from "express";
import {
  addToCartHandler,
  deleteCartItemHandler,
} from "../controllers/cart.controller";
import { zodSchemaValidator } from "../validators/zod.validator";
import cartZodSchema from "../dto/cart.dto";

const cartRouter: Router = express.Router();

cartRouter.post("/", zodSchemaValidator(cartZodSchema), addToCartHandler);
cartRouter.delete("/:cartId/:productId", deleteCartItemHandler);

export default cartRouter;
