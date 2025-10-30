import { productdto } from "../dto/product.dto";
import {
  addProduct,
  getAllProducts,
  getProductByCategory,
} from "../repositories/product.repository";
import catchErrorHelper from "../utils/catch.error";

export async function addProductService(product: productdto) {
  return await catchErrorHelper(async () => {
    return await addProduct(product);
  });
}

export async function getAllProductsService() {
  return await catchErrorHelper(async () => {
    return await getAllProducts();
  });
}

export async function getProductByCategoryService(category: string) {
  return await catchErrorHelper(async () => {
    return await getProductByCategory(category);
  });
}
