import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUserData: (state, { payload }) => {
      console.log("user data =>", payload);
      state.list = payload;
    },
  },
});

export const { addUserData } = userSlice.actions;
export const getUserData = (state) => state.user.list;
export default userSlice.reducer;
