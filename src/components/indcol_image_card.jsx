import { useSelector } from "react-redux";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setImgArray, clearImg } from "../state/indimageslice";
import { isLoading } from "../state/photosloadingsclice";
import { setPhotoArray } from "../state/photoslice";
import { isTrue } from "../state/booleanslice";
import { setIndex } from "../state/imgindexslice";
import { setCollArray } from "../state/collslice";
import { setImageArray } from "../state/relatedimageslice";
import {
  setApiErrorMsg,
  setResetTime,
  setIsApiLimited,
} from "../state/booleanslice";

function IndColImgCard(props) {
  const loading = useSelector((state) => state.load.value);
  const imArray = useSelector((state) => state.colName.colimg);
  const divRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const imgIndex = props.iIndex;

  async function showImg() {
    if (divRef.current) {
      const imgID = divRef.current.id;

      try {
        if (imgID) {
          dispatch(clearImg());
          dispatch(isLoading(true));
          navigate(`/image/${imgID}`);
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/image/${imgID}`
          );

          const imgArray = response.data.imgArray;
          dispatch(setImgArray(imgArray));

          const perPage = 15;
          const Page = 1;

          const searchValue = imgArray.tags[0].title;

          const response1 = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/photo`,
            {
              params: {
                searchValue: searchValue,
                perPage: perPage,
                Page: Page,
              },
            }
          );
          dispatch(isLoading(false));
          const array = response1.data.photosArray;
          dispatch(setImageArray(array));
        }
      } catch (error) {
        if (error.response.status === 429) {
          const { message, resetTime, apiReached } = error.response.data;
          dispatch(setApiErrorMsg(message));
          dispatch(setIsApiLimited(apiReached));
          dispatch(setResetTime(resetTime));
        }
        console.error("No image id found for this image:", error);
      }
    }
  }

  const showColl = async (imageId) => {
    dispatch(isTrue(true));

    dispatch(setIndex(imageId));

    const imgId = imArray[imageId].img_id;

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/coll/${imgId}`
      );
      const collArray = response.data.collArray;
      dispatch(setCollArray(collArray));
    } catch (error) {
      console.error("Error retrieving collections:", error);
    }
  };

  return (
    <div className={loading ? "none" : "card"}>
      <div
        id={props.imgId}
        ref={divRef}
        className="h"
        style={{
          backgroundImage: `url("${props.bgImg}")`,
          aspectRatio: `${props.width} / ${props.height}`,
        }}
        onClick={showImg}
      ></div>
      <div className="opt">
        {/* <button onClick={() => handleDownload(imgIndex)} type="button">
          Download
        </button> */}
        <button onClick={() => showColl(imgIndex)} type="button">
          Add to a Collection
        </button>
      </div>
    </div>
  );
}

export default IndColImgCard;
