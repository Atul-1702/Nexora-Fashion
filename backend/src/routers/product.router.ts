import express, { Router } from "express";
import fileUploaderMiddleware from "../middlewares/file-upload.midleware";
import { zodSchemaValidator } from "../validators/zod.validator";
import productZodSchema from "../dto/product.dto";
import upload from "../config/multer.config";
import {
  addProductHandler,
  getAllProductsHandler,
  getProductByCategoryHandler,
} from "../controllers/product.controller";

const productRouter: Router = express.Router();

productRouter.post(
  "/",
  upload.single("image"),
  zodSchemaValidator(productZodSchema),
  fileUploaderMiddleware,
  addProductHandler
);

productRouter.get("/", getAllProductsHandler);

productRouter.get("/:category", getProductByCategoryHandler);

export default productRouter;
