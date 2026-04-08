import { createSlice } from "@reduxjs/toolkit";

const ImgIndexState = createSlice({
  name: "index",
  initialState: { value: null },
  reducers: {
    setIndex: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setIndex } = ImgIndexState.actions;
export default ImgIndexState.reducer;
