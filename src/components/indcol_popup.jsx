import { useSelector, useDispatch } from "react-redux";
import {
  setCollArray,
  setSearchedColl,
  setImageColl,
  setAction,
} from "../state/collslice";
import { isTrue, setEmptyState, setShowNotify } from "../state/booleanslice";
import InputSearch from "./imput";
import axios from "axios";
import CollList from "./coll-list";
import { setInputColText } from "../state/inputtextslice";
import Notification from "./notification";
import { useRef } from "react";

function IndColPopUp() {
  const dispatch = useDispatch();
  const photo = useSelector((state) => state.colName.colimg);
  const photoIndex = useSelector((state) => state.index.value);
  const show = useSelector((state) => state.boolean.value);
  const inp = useSelector((state) => state.text.inputcol);
  const notificationTimer = useRef(null);

  function hide() {
    dispatch(isTrue(false));
    dispatch(setInputColText(""));
    dispatch(setEmptyState(true));
  }

  const addColl = async (id, col) => {
    console.log("clicked");
    if (notificationTimer.current) {
      clearTimeout(notificationTimer.current);
    }
    if (id && col) {
      const collId = id;
      const collName = col;

      console.log(collId, collName);

      dispatch(setImageColl(collName));
      dispatch(setAction("added to"));

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/imgcoll`,
          {
            collId: collId,
            collName: collName,
            imgId: photo[photoIndex].img_id,
            imgUrl: photo[photoIndex].img_url,
            imgH: photo[photoIndex].img_h,
            imgW: photo[photoIndex].img_w,
          }
        );

        const arrColl = response.data.collArray;
        dispatch(setCollArray(arrColl));
        const result = arrColl.filter((item) =>
          item.collection.toLowerCase().includes(inp.toLowerCase())
        );
        dispatch(setSearchedColl(result));
        dispatch(setShowNotify(true));
        notificationTimer.current = setTimeout(() => {
          dispatch(setShowNotify(false));
          notificationTimer.current = null;
        }, 3000);
      } catch (error) {
        console.error("Error adding image to collection:", error);
      }
    }
  };

  return (
    <div onClick={hide} className={show ? "overlay" : "hide"}>
      <div onClick={(e) => e.stopPropagation()} className="pop">
        <div className="coll-search search-box ">
          <InputSearch></InputSearch>
        </div>
        <CollList addImgToCol={addColl}></CollList>
      </div>
      <Notification></Notification>
    </div>
  );
}

export default IndColPopUp;
