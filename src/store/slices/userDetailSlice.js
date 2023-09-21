import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userDetails: {
    name: "Akhilesh Patidar",
  },
};

export const userDetailSlice = createSlice({
  name: "userDetailSlice",
  initialState,
  reducers: {
    setUserDetails(state, action) {
      state.userDetails = action.payload;
    },
  },
});

export const { setUserDetails } = userDetailSlice.actions;
export default userDetailSlice.reducer;
