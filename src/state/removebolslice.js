import { createSlice } from "@reduxjs/toolkit";

const RevBooleanState = createSlice({
  name: "revboolean",
  initialState: { value: false },
  reducers: {
    isTrue1: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { isTrue1 } = RevBooleanState.actions;
export default RevBooleanState.reducer;
