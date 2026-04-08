import Button2 from "../button2";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setImgArray } from "../../state/indimageslice";
import { isLoading } from "../../state/photosloadingsclice";
import { setDL } from "../../state/photosloadingsclice";
import axios from "axios";
import {
  setPhotoArray,
  clearPhotos,
  setPhotoSocials,
} from "../../state/photoslice";
import { setImageArray } from "../../state/relatedimageslice";
import RelImgGrid from "../rel_img_grid";
import { isTrue1 } from "../../state/removebolslice";
import { setDownloadCard, setAddState } from "../../state/booleanslice";
import { setState } from "../../state/booleanslice";
import { setCollArray, setRevCollArray } from "../../state/collslice";

const API_KEY = "awMXFC3RsKaQ3nNjELoXXh9XFJbZMnTSrSw7IVzdJj0";

async function onLoad() {
  const dispatch = useDispatch();
  const { query } = useParams();
  if (query) {
    try {
      dispatch(clearPhotos());
      dispatch(isLoading(true));
      // navigate(`/results/${searchValue}`);

      const response = await axios.get(
        `http://localhost:5000/api/image/${query}`
      );
      const imgArray = response.data.imgArray;
      dispatch(setImgArray(imgArray));

      const perPage = 15;
      const Page = 1;

      const searchValue = imgArray.tags[0].title;
      console.log(searchValue, "image summary");
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
    } catch (error) {
      console.error("Unable to get backend message:", error);
    }
  }
}

function ImgBody(params) {
  const loading = useSelector((state) => state.load.value);
  const image = useSelector((state) => state.img.ImgArray);
  const dispatch = useDispatch();

  if (image === null && loading === true) {
    console.log("First Load");
    onLoad();
  }

  const handleDownload = async (photo) => {
    try {
      dispatch(setDL(true));
      await fetch(photo.links.download_location, {
        headers: {
          Authorization: `Client-ID ${API_KEY}`,
        },
      });

      // 2. Convert URL to Blob to force download
      const response = await fetch(photo.urls.full);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      // 3. Create a temporary anchor and trigger it
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `unsplash-photo-${photo.id}.jpg`;
      document.body.appendChild(link);
      link.click();
      dispatch(setDL(false));

      const fullSocials = photo.user.social;
      const { paypal_email, ...socials } = fullSocials;

      dispatch(setPhotoSocials(socials));
      dispatch(setDownloadCard(true));

      // 4. Cleanup memory
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Error downloading the image:", error);
    }
  };

  const revColl = async (image) => {
    console.log(image.id);
    dispatch(isTrue1(true));

    const imgId = image.id;

    try {
      const response = await axios.get(
        `http://localhost:5000/api/revcoll/${imgId}`
      );
      const collArray = response.data.collArray;
      if (Array.isArray(collArray)) {
        dispatch(setState(true));
      } else {
        dispatch(setState(false));
      }
      dispatch(setRevCollArray(collArray));
    } catch (error) {
      console.error("Error retrieving collections:", error);
    }
  };

  const addColl = async (image) => {
    console.log(image.id);
    dispatch(setAddState(true));

    const imgId = image.id;

    try {
      const response = await axios.get(
        `http://localhost:5000/api/coll/${imgId}`
      );
      const collArray = response.data.collArray;
      dispatch(setCollArray(collArray));
    } catch (error) {
      console.error("Error retrieving collections:", error);
    }
  };

  return (
    <div className="body img-body">
      {loading ? (
        <div className="img-con load ld"></div>
      ) : (
        <div
          className="back-ground"
          style={{
            backgroundImage: `url("${image.urls.regular}")`,
          }}
        >
          <div className="back-blur">
            {loading ? (
              <div className="img-con load ld"></div>
            ) : (
              <div
                className="img-con"
                style={{
                  backgroundImage: `url("${image.urls.regular}")`,
                  aspectRatio: `${image.width} / ${image.height}`,
                }}
              ></div>
            )}

            <div className={loading ? "none" : "img-contents"}>
              <div className="descr">
                {loading ? (
                  <h3>Image Description</h3>
                ) : (
                  <h3>{image.alt_description}</h3>
                )}
              </div>
              <div>
                <Button2
                  bName="Alter Collection"
                  fName={() => revColl(image)}
                ></Button2>
              </div>
              <div>
                <Button2
                  bName="Download"
                  fName={() => handleDownload(image)}
                ></Button2>
              </div>
              <div>
                <Button2
                  bName="Add to Collection"
                  fName={() => addColl(image)}
                ></Button2>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="rel-imgs">
        <h4>Related images</h4>
        <RelImgGrid></RelImgGrid>
      </div>
    </div>
  );
}

export default ImgBody;
