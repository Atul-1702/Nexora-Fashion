import { productdto } from "../dto/product.dto";
import productModel from "../models/product.model";

export async function addProduct(product: productdto) {
  const productDB = await productModel.create(product);
  return productDB;
}

export async function getAllProducts() {
  const allProducts = await productModel.find();
  return allProducts;
}

export async function getProductByCategory(category: string) {
  return await productModel.find({ category });
}
