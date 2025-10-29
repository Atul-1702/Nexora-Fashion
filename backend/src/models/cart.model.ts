import mongoose from "mongoose";

const CartModel = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  product: [
    {
      _id: false,
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: [1, "Minimum quantity should be 1."],
        max: [5, "Maximum quantity should not exceed by 5."],
      },
    },
  ],
});

export default mongoose.model("cart", CartModel);
