import mongoose, { Types } from "mongoose";
import { cartdto } from "../dto/cart.dto";
import cartModel from "../models/cart.model";
import productModel from "../models/product.model";

export async function addToCart(cart: cartdto) {
  const cartDB = cartModel.create(cart);
  (await cartDB).save();
  return cartDB;
}

export async function getCartByUser(userId: string) {
  const cartByUser = await cartModel.findOne({
    userId,
  });
  return cartByUser;
}

export async function updateCartByUser(cart: any) {
  const updatedCart = await cartModel.findByIdAndUpdate(cart._id, cart, {
    new: true,
  });
  return updatedCart;
}

export async function deleteCartItem(cartId: string) {
  const deletedRecord = await cartModel.findByIdAndDelete(cartId, {
    new: true,
  });
  return [];
}

export async function getCartById(id: string) {
  const cartById = await cartModel.findById(id);
  return cartById;
}

export async function getCartByUserWithProductDetails(userId: string) {
  const cartWithProductDetails = await cartModel
    .findOne({ userId })
    .populate({
      path: "product.id",
      model: "product",
    })
    .exec();

  return cartWithProductDetails;
}

export async function updateProductQuantity(
  userId: string,
  productId: string,
  quantity: number
) {
  const updatedCart = await cartModel
    .findOneAndUpdate(
      { userId, "product.id": productId },
      { $set: { "product.$.quantity": quantity } },
      { new: true }
    )
    .populate({
      path: "product.id",
      model: "product",
    })
    .exec();

  return updatedCart;
}
