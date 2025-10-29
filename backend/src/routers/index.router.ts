import express, { Router } from "express";
import userRouter from "./user.router";
import productRouter from "./product.router";
import cartRouter from "./cart.router";

const router: Router = express.Router();

router.use("/user", userRouter);
router.use("/product", productRouter);
router.use("/cart", cartRouter);

export default router;
