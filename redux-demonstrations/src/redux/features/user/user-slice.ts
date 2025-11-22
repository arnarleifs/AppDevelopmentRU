import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  name: string;
  bio: string;
}

interface UserPayload {
  name: string;
  bio: string;
}

const initialState: UserState = {
  name: "",
  bio: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    changeUser: (state, action: PayloadAction<UserPayload>) => {
      const { name, bio } = action.payload;

      // Update user
      state.name = name;
      state.bio = bio;
    },
  },
});

export const { changeUser } = userSlice.actions;
export default userSlice.reducer;
