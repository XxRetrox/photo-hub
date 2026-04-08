import { createSlice } from "@reduxjs/toolkit";

const SuggState = createSlice({
  name: "sugg",
  initialState: { suggArray: [] },
  reducers: {
    setSuggArray: (state, action) => {
      state.suggArray = action.payload;
    },
    clearSugg: (state) => {
      state.suggArray = [];
    },
  },
});

export const { setSuggArray, clearSugg } = SuggState.actions;
export default SuggState.reducer;
