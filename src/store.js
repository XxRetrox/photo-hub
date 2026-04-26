import { configureStore } from "@reduxjs/toolkit";
import collNameReducer from "./state/coll-nameslice";
import EmptyStateReducer from "./state/emptyslice";
import PhotoStateReducer from "./state/photoslice";
import SeInputStateReducer from "./state/searchnamesclice";
import PhotoLoadingStateReducer from "./state/photosloadingsclice";
import SuggStateReducer from "./state/suggslice";
import InpTextStateReducer from "./state/inputtextslice";
import ImageStateReducer from "./state/indimageslice";
import BooleanStateReducer from "./state/booleanslice";
import CollStateReducer from "./state/collslice";
import RelImgStateReducer from "./state/relatedimageslice";
import ImgIndexStateReducer from "./state/imgindexslice";
import RevBooleanStateReducer from "./state/removebolslice";

const store = configureStore({
  reducer: {
    colName: collNameReducer,
    empState: EmptyStateReducer,
    photos: PhotoStateReducer,
    searchtext: SeInputStateReducer,
    load: PhotoLoadingStateReducer,
    sugg: SuggStateReducer,
    text: InpTextStateReducer,
    img: ImageStateReducer,
    boolean: BooleanStateReducer,
    collection: CollStateReducer,
    relphotos: RelImgStateReducer,
    index: ImgIndexStateReducer,
    revboolean: RevBooleanStateReducer,
  },
});

export default store;
