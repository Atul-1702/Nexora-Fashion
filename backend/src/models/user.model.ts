import mongoose from "mongoose";

const UserModel = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "User name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required."],
    minLength: [6, "Min length of password should be 6."],
    maxLength: [10, "Max length of password should be 10."],
  },
});

export default mongoose.model("user", UserModel);
