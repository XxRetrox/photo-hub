import { createSlice } from "@reduxjs/toolkit";

const PhotoLoadingState = createSlice({
  name: "load",
  initialState: { value: true, isDL: false },
  reducers: {
    isLoading: (state, action) => {
      state.value = action.payload;
    },
    setDL: (state, action) => {
      state.isDL = action.payload;
    },
  },
});

export const { isLoading, setDL } = PhotoLoadingState.actions;
export default PhotoLoadingState.reducer;
