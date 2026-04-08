import { createSlice } from "@reduxjs/toolkit";

const RelImgState = createSlice({
  name: "relphotos",
  initialState: { imageArray: [] },
  reducers: {
    setImageArray: (state, action) => {
      state.imageArray = action.payload;
    },
    clearImages: (state) => {
      state.imageArray = [];
    },
  },
});

export const { setImageArray, clearImages } = RelImgState.actions;
export default RelImgState.reducer;
