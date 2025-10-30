import { configureStore } from "@reduxjs/toolkit";
import OwnerSlice from "./ownerSlice";
import userSlice from "./user.slice";

const store = configureStore({
  reducer: {
    OwnerSlice,
    userSlice,
  },
});

export default store;
