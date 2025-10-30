import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    searchedValue: "",
    totalCartItem: 0,
  },
  reducers: {
    setSearchedField: (state, action) => {
      state.searchedValue = action.payload;
    },
    setTotalCartItem: (state, action) => {
      state.totalCartItem = action.payload;
    },
  },
});

export const { setSearchedField, setTotalCartItem } = userSlice.actions;
export default userSlice.reducer;
