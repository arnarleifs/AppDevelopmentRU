import { createSlice } from "@reduxjs/toolkit";

interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 0,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    incrementCounter: (state) => {
      state.value += 1;
    },
  },
});

export const { incrementCounter } = counterSlice.actions;

export default counterSlice.reducer;
