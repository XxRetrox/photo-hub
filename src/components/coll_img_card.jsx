import { useSelector } from "react-redux";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setImgArray, clearImg, setColImgArr } from "../state/indimageslice";
import { isLoading } from "../state/photosloadingsclice";
import { setAddState } from "../state/booleanslice";
import { setIndex } from "../state/imgindexslice";
import { setCollArray } from "../state/collslice";
import { setImageArray } from "../state/relatedimageslice";

function ColImgCard(props) {
  const loading = useSelector((state) => state.load.value);
  const imArray = useSelector((state) => state.relphotos.imageArray);
  const divRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const imgIndex = props.iIndex;

  async function showImg() {
    if (divRef.current) {
      const imgID = divRef.current.id;
      console.log(imgID);

      try {
        if (imgID) {
          dispatch(clearImg());
          dispatch(isLoading(true));
          navigate(`/image/${imgID}`);
          const response = await axios.get(
            `http://localhost:5000/api/image/${imgID}`
          );

          const imgArray = response.data.imgArray;
          dispatch(setImgArray(imgArray));

          const perPage = 15;
          const Page = 1;

          const searchValue = imgArray.tags[0].title;
          console.log(searchValue);
          const response1 = await axios.get(`http://localhost:5000/api/photo`, {
            params: {
              searchValue: searchValue,
              perPage: perPage,
              Page: Page,
            },
          });
          dispatch(isLoading(false));
          const array = response1.data.photosArray;
          dispatch(setImageArray(array));
        }
      } catch (error) {
        console.log("No image id found for this image:", error);
      }
    }
  }

  const showColl = async (imageId) => {
    console.log(imageId);
    dispatch(setAddState(true));

    const imgId = `${imageId}_diff`;

    try {
      const response = await axios.get(
        `http://localhost:5000/api/coll/${imgId}`
      );
      const collArray = response.data.collArray;
      const imgArray = response.data.imgArray;

      dispatch(setCollArray(collArray));
      dispatch(setColImgArr(imgArray));
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
        <button onClick={() => showColl(props.imgId)} type="button">
          Add to a Collection
        </button>
      </div>
    </div>
  );
}

export default ColImgCard;
