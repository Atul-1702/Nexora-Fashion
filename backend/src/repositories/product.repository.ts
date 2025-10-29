import { productdto } from "../dto/product.dto";
import productModel from "../models/product.model";

export async function addProduct(product: productdto) {
  const productDB = await productModel.create(product);
  return productDB;
}
