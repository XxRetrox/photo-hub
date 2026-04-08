import { createSlice } from "@reduxjs/toolkit";

const InpTextState = createSlice({
  name: "text",
  initialState: { value: "", inputcol: "" },
  reducers: {
    setText: (state, action) => {
      state.value = action.payload;
    },
    clearText: (state) => {
      state.value = "";
    },
    setInputColText: (state, action) => {
      state.inputcol = action.payload;
    },
  },
});

export const { setText, clearText, setInputColText } = InpTextState.actions;
export default InpTextState.reducer;
