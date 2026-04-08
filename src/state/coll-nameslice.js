import { createSlice } from "@reduxjs/toolkit";

const CollName = createSlice({
  name: "colName",
  initialState: { text: null, colsort: [], colimg: [], colid: "" },
  reducers: {
    setColName: (state, action) => {
      state.text = action.payload;
    },
    setCol: (state, action) => {
      state.colsort = action.payload;
    },
    setColImg: (state, action) => {
      state.colimg = action.payload;
    },
    setColId: (state, action) => {
      state.colid = action.payload;
    },
  },
});

export const { setColName, setCol, setColImg, setColId } = CollName.actions;
export default CollName.reducer;
