import { cartdto } from "../dto/cart.dto";
import {
  addToCart,
  deleteCartItem,
  getCartById,
  getCartByUser,
  getCartByUserWithProductDetails,
  updateCartByUser,
  updateProductQuantity,
} from "../repositories/cart.repository";
import { NotFoundError } from "../utils/app.error";
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
      return await updateCartByUser(userCartDetails);
    }
  }
}

export async function getCartByUserServcie(userId: string) {
  const userCart = await catchErrorHelper(async () => {
    return await getCartByUser(userId);
  });

  if (!userCart) {
    throw new NotFoundError("Products does not exists in cart.");
  }
  return userCart;
}

export async function getCartByUserWithProductDetailsServcie(userId: string) {
  return await catchErrorHelper(async () => {
    return await getCartByUserWithProductDetails(userId);
  });
}

export async function updateProductQuantityService(
  userId: string,
  productId: string,
  quantity: number
) {
  return await catchErrorHelper(async () => {
    return await updateProductQuantity(userId, productId, quantity);
  });
}
