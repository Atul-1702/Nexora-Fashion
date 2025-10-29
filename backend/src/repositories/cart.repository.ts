import mongoose, { Types } from "mongoose";
import { cartdto } from "../dto/cart.dto";
import cartModel from "../models/cart.model";

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
  const updatedCart = await cartModel.findByIdAndUpdate(cart._id, cart);
  return updatedCart;
}

export async function deleteCartItem(cartId: string) {
  const deletedRecord = await cartModel.findByIdAndDelete(cartId);
  return deletedRecord;
}

export async function getCartById(id: string) {
  console.log(id);
  const cartById = await cartModel.findById(id);
  return cartById;
}
