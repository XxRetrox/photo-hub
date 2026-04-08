import { createSlice } from "@reduxjs/toolkit";

const ImageState = createSlice({
  name: "img",
  initialState: { ImgArray: null, ColImgArr: null },
  reducers: {
    setImgArray: (state, action) => {
      state.ImgArray = action.payload;
    },
    clearImg: (state) => {
      state.ImgArray = [];
    },
    setColImgArr: (state, action) => {
      state.ColImgArr = action.payload;
    },
  },
});

export const { setImgArray, clearImg, setColImgArr } = ImageState.actions;
export default ImageState.reducer;
