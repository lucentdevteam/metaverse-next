import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userDetails: {},
  isUserLoggedIn: false,
};

export const userDetailSlice = createSlice({
  name: "userDetailSlice",
  initialState,
  reducers: {
    setUserDetails(state, action) {
      state.userDetails = action.payload;
      state.isUserLoggedIn =  true;
    },
    setIsUserLoggedIn(state, action){
      state.isUserLoggedIn = action.payload
    }
  },
});

export const { setUserDetails,setIsUserLoggedIn } = userDetailSlice.actions;
export default userDetailSlice.reducer;
