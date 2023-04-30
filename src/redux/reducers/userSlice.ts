import { createSlice } from "@reduxjs/toolkit";
import { UserInterface } from "../../interfaces/UserInterface";

interface UserState {
  data: UserInterface | null;
}

const initialState: UserState = {
  data: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.data = action.payload;
    },
    clearUser: (state) => {
      state.data = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
