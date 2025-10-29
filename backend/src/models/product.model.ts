import mongoose from "mongoose";

const ProductModel = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product name is required."],
    minLength: [5, "Name should contain minimum 5 characters"],
    maxLength: [100, "Name should contain maximum 5 characters"],
  },
  price: {
    type: Number,
    required: [true, "Product price is required."],
    min: [10, "Price must be at least 10"],
    max: [5000, "Price cannot exceed 5,000"],
  },
  image: {
    type: String,
    required: [true, "Product image is required"],
  },
});

export default mongoose.model("product", ProductModel);
