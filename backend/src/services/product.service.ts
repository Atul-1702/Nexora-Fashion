import { productdto } from "../dto/product.dto";
import { addProduct } from "../repositories/product.repository";
import catchErrorHelper from "../utils/catch.error";

export async function addProductService(product: productdto) {
  return await catchErrorHelper(async () => {
    await addProduct(product);
  });
}
