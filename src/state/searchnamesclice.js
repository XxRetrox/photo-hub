import { createSlice } from "@reduxjs/toolkit";

const SeInputState = createSlice({
  name: "searchtext",
  initialState: { value: null, random: [] },
  reducers: {
    setInpName: (state, action) => {
      state.value = action.payload;
    },
    setRandom: (state, action) => {
      state.random = action.payload;
    },
  },
});

export const { setInpName, setRandom } = SeInputState.actions;
export default SeInputState.reducer;
