import { createSlice } from "@reduxjs/toolkit";

const CollState = createSlice({
  name: "collection",
  initialState: {
    collArray: [],
    revCollArray: [],
    searchedColl: [],
    imageColl: "",
    action: "",
  },
  reducers: {
    setCollArray: (state, action) => {
      state.collArray = action.payload;
    },
    clearColl: (state) => {
      state.collArray = [];
    },
    setRevCollArray: (state, action) => {
      state.revCollArray = action.payload;
    },
    setSearchedColl: (state, action) => {
      state.searchedColl = action.payload;
    },
    setImageColl: (state, action) => {
      state.imageColl = action.payload;
    },
    setAction: (state, action) => {
      state.action = action.payload;
    },
  },
});

export const {
  setCollArray,
  clearColl,
  setRevCollArray,
  setSearchedColl,
  setImageColl,
  setAction,
} = CollState.actions;
export default CollState.reducer;
