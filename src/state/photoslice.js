import { createSlice } from "@reduxjs/toolkit";

const PhotoState = createSlice({
  name: "photos",
  initialState: { photoArray: [], photoSocials: [] },
  reducers: {
    setPhotoArray: (state, action) => {
      const newPhotos = action.payload.filter(
        (newPhoto) =>
          !state.photoArray.some((oldPhoto) => oldPhoto.id === newPhoto.id)
      );
      state.photoArray = [...state.photoArray, ...newPhotos];
    },
    clearPhotos: (state) => {
      state.photoArray = [];
    },
    setPhotoSocials: (state, action) => {
      state.photoSocials = action.payload;
    },
  },
});

export const { setPhotoArray, clearPhotos, setPhotoSocials } =
  PhotoState.actions;
export default PhotoState.reducer;
