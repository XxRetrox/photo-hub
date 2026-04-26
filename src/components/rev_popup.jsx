import { useSelector, useDispatch } from "react-redux";
import {
  setCollArray,
  setRevCollArray,
  setAction,
  setImageColl,
} from "../state/collslice";
import { setShowNotify } from "../state/booleanslice";
import { isTrue1 } from "../state/removebolslice";
import axios from "axios";
import Notification from "./notification";
import { useRef } from "react";

function RevPopUp() {
  const dispatch = useDispatch();
  const inpText = useSelector((state) => state.text.value);
  const coll = useSelector((state) => state.collection.collArray);
  const coll2 = useSelector((state) => state.collection.revCollArray);
  const photo = useSelector((state) => state.img.ImgArray);
  const show = useSelector((state) => state.revboolean.value);
  const det = useSelector((state) => state.boolean.value2);
  const photoIndex = useSelector((state) => state.index.value);
  const notificationTimer = useRef(null);

  function hide() {
    dispatch(isTrue1(false));
  }

  const revColl = async (id, col) => {
    if (notificationTimer.current) {
      clearTimeout(notificationTimer.current);
    }
    if (id && col) {
      const collId = id;
      const collName = col;

      dispatch(setImageColl(collName));
      dispatch(setAction("removed from"));

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/revimgcoll`,
          {
            collId: collId,
            collName: collName,
            imgId: photo.id,
          }
        );

        const arrColl = response.data.collArray;
        dispatch(setRevCollArray(arrColl));
        dispatch(setShowNotify(true));
        notificationTimer.current = setTimeout(() => {
          dispatch(setShowNotify(false));
          notificationTimer.current = null;
        }, 3000);
      } catch (error) {
        console.error("Error removing image from collection:", error);
      }
    }
  };

  return (
    <div onClick={hide} className={show ? "overlay" : "hide"}>
      <div onClick={(e) => e.stopPropagation()} className="pop">
        <div className="list-coll">
          {Array.isArray(coll2) ? (
            coll2.map((col, index) => {
              return (
                <div
                  onClick={() => revColl(col.coll_id, col.coll_name)}
                  key={index}
                  id={col.coll_id}
                  className="b"
                >
                  <h4>{col.coll_name}</h4>
                </div>
              );
            })
          ) : (
            <div
              style={{ backgroundColor: "transparent", border: "none" }}
              className="b"
            >
              <h4 style={{ textAlign: "center" }}>{coll2}</h4>
            </div>
          )}
        </div>
      </div>
      <Notification></Notification>
    </div>
  );
}

export default RevPopUp;
