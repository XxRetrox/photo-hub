import { useSelector, useDispatch } from "react-redux";
import {
  setCollArray,
  setSearchedColl,
  setImageColl,
  setAction,
} from "../state/collslice";
import {
  isTrue,
  setAddState,
  setEmptyState,
  setShowNotify,
} from "../state/booleanslice";
import axios from "axios";
import CollList from "./coll-list";
import InputSearch from "./imput";
import { setInputColText } from "../state/inputtextslice";
import Notification from "./notification";

function AddPopUp(params) {
  const dispatch = useDispatch();
  const inpText = useSelector((state) => state.text.value);
  const inp = useSelector((state) => state.text.inputcol);
  const coll = useSelector((state) => state.collection.collArray);
  const photo = useSelector((state) => state.img.ImgArray);
  const show = useSelector((state) => state.boolean.value3);
  const photoIndex = useSelector((state) => state.index.value);

  function hide() {
    dispatch(setAddState(false));
    dispatch(setInputColText(""));
    dispatch(setEmptyState(true));
  }

  const addColl = async (id, col) => {
    console.log("clicked");
    if (id && col) {
      const collId = id;
      const collName = col;

      console.log(collId, collName);
      dispatch(setImageColl(collName));
      dispatch(setAction("added to"));

      try {
        const response = await axios.post("http://localhost:5000/api/imgcoll", {
          collId: collId,
          collName: collName,
          imgId: photo.id,
          imgUrl: photo.urls.small,
          imgH: photo.height,
          imgW: photo.width,
        });

        const arrColl = response.data.collArray;
        dispatch(setCollArray(arrColl));
        const result = arrColl.filter((item) =>
          item.collection.toLowerCase().includes(inp.toLowerCase())
        );
        dispatch(setSearchedColl(result));
        dispatch(setShowNotify(true));
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

export default AddPopUp;
