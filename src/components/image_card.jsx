import { useSelector } from "react-redux";
import { useRef, forwardRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setImgArray, clearImg } from "../state/indimageslice";
import { isLoading } from "../state/photosloadingsclice";
import { setPhotoArray, setPhotoSocials } from "../state/photoslice";
import { isTrue, setDownloadCard, resetPageNum } from "../state/booleanslice";
import { setIndex } from "../state/imgindexslice";
import { setCollArray } from "../state/collslice";
import { clearImages, setImageArray } from "../state/relatedimageslice";

const API_KEY = import.meta.env.VITE_UNSPLASH_API_KEY;

const ImgCard = forwardRef((props, forwardedRef) => {
  const loading = useSelector((state) => state.load.value);
  const imArray = useSelector((state) => state.photos.photoArray);
  const divRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const imgIndex = props.iIndex;

  const setRefs = useCallback(
    (node) => {
      divRef.current = node; // Update internal ref
      if (forwardedRef) {
        if (typeof forwardedRef === "function") {
          forwardedRef(node);
        } else {
          forwardedRef.current = node;
        }
      }
    },
    [forwardedRef]
  );

  async function showImg() {
    if (divRef.current) {
      const imgID = divRef.current.id;
      console.log(imgID);

      try {
        if (imgID) {
          dispatch(clearImg());
          dispatch(clearImages());
          dispatch(resetPageNum());
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
          console.log(searchValue, "image summary");
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
        console.log("No image id found for this image:", error);
      }
    }
  }

  const handleDownload = async (photo) => {
    try {
      await fetch(imArray[photo].links.download_location, {
        headers: {
          Authorization: `Client-ID ${API_KEY}`,
        },
      });

      // 2. Convert URL to Blob to force download
      const response = await fetch(imArray[photo].urls.full);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      // 3. Create a temporary anchor and trigger it
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `unsplash-photo-${imArray[photo].id}.jpg`;
      document.body.appendChild(link);
      link.click();

      const fullSocials = imArray[photo].user.social;
      const { paypal_email, ...socials } = fullSocials;

      dispatch(setPhotoSocials(socials));
      dispatch(setDownloadCard(true));

      // 4. Cleanup memory
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);

      dispatch(setDownloadCard(true));
    } catch (error) {
      console.error("Error downloading the image:", error);
    }
  };

  const showColl = async (imageId) => {
    console.log(imageId);
    dispatch(isTrue(true));

    dispatch(setIndex(imageId));

    const imgId = imArray[imageId].id;

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
        ref={setRefs}
        className="h"
        style={{
          backgroundImage: `url("${props.bgImg}")`,
          aspectRatio: `${props.width} / ${props.height}`,
        }}
        onClick={showImg}
      ></div>
      <div className="opt">
        <button onClick={() => handleDownload(imgIndex)} type="button">
          Download
        </button>
        <button onClick={() => showColl(imgIndex)} type="button">
          +
        </button>
      </div>
    </div>
  );
});

export default ImgCard;
