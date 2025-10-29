import { cartdto } from "../dto/cart.dto";
import {
  addToCart,
  deleteCartItem,
  getCartById,
  getCartByUser,
  updateCartByUser,
} from "../repositories/cart.repository";
import catchErrorHelper from "../utils/catch.error";

export async function addToCartService(cart: cartdto) {
  return await catchErrorHelper(async () => {
    const cartDetailsByUser = await getCartByUser(cart.userId);
    if (!cartDetailsByUser) {
      return await addToCart(cart);
    } else {
      cartDetailsByUser.product.push(cart.product);
      return await updateCartByUser(cartDetailsByUser);
    }
  });
}

export async function deleteCartItemService(cartId: string, productId: string) {
  let userCartDetails = await getCartById(cartId);

  if (userCartDetails?.product.length === 1) {
    return await deleteCartItem(cartId);
  } else {
    if (userCartDetails) {
      for (let p of userCartDetails.product) {
        if (p.id == productId) {
          userCartDetails.product.remove(p);
        }
      }
      return userCartDetails;
    }
  }
}
