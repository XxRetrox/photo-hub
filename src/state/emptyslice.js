import { createSlice } from "@reduxjs/toolkit";

const EmptyState = createSlice({
  name: "empState",
  initialState: { value: null },
  reducers: {
    isEmpty: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { isEmpty } = EmptyState.actions;
export default EmptyState.reducer;
