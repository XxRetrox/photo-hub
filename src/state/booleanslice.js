import { createSlice } from "@reduxjs/toolkit";

const BooleanState = createSlice({
  name: "boolean",
  initialState: {
    value: false,
    value2: "",
    value3: "",
    isEmp: true,
    downloaded: false,
    showNotify: false,
    pageNum: 1,
    isApiLimited: false,
    apiErrorMsg: "",
    resetTime: 0,
  },
  reducers: {
    isTrue: (state, action) => {
      state.value = action.payload;
    },
    setState: (state, action) => {
      state.value2 = action.payload;
    },
    setAddState: (state, action) => {
      state.value3 = action.payload;
    },
    setEmptyState: (state, action) => {
      state.isEmp = action.payload;
    },
    setDownloadCard: (state, action) => {
      state.downloaded = action.payload;
    },
    setShowNotify: (state, action) => {
      state.showNotify = action.payload;
    },
    setPageNum: (state, action) => {
      state.pageNum += 1;
    },
    resetPageNum: (state, action) => {
      state.pageNum = 1;
    },
    setIsApiLimited: (state, action) => {
      state.isApiLimited = action.payload;
    },
    setApiErrorMsg: (state, action) => {
      state.apiErrorMsg = action.payload;
    },
    setResetTime: (state, action) => {
      state.resetTime = action.payload;
    },
  },
});

export const {
  isTrue,
  setState,
  setAddState,
  setEmptyState,
  setDownloadCard,
  setShowNotify,
  setPageNum,
  resetPageNum,
  setApiErrorMsg,
  setIsApiLimited,
  setResetTime,
} = BooleanState.actions;
export default BooleanState.reducer;
