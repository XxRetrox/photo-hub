import Masonry from "react-masonry-css";
import ImgCard from "../image_card";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useParams } from "react-router-dom";
import { setInpName } from "../../state/searchnamesclice";
import { isLoading } from "../../state/photosloadingsclice";
import { setPhotoArray, clearPhotos } from "../../state/photoslice";
import { useState, useEffect, useRef, useCallback } from "react";
import { setPageNum } from "../../state/booleanslice";

const breakpointColumsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1,
};

function ResultBody() {
  const { query } = useParams();
  const searchtext = useSelector((state) => state.searchtext.value);
  const arrayOfPhotos = useSelector((state) => state.photos.photoArray);
  const searchInp = useSelector((state) => state.searchtext.value);
  const page = useSelector((state) => state.boolean.pageNum);
  const loading = useSelector((state) => state.load.value);
  // const [page, setPage] = useState(1);
  const [loading1, setLoading] = useState(false);
  const [itHasMore, setItHasMore] = useState(true);
  const observer = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    let isCancelled = false;
    async function fetchPhotos() {
      if (!query) return;

      if (page === 1) {
        console.log("first load");
        dispatch(clearPhotos());
        dispatch(isLoading(true));
      } else {
        console.log("loading more photos");
        setLoading(true);
      }

      try {
        const searchValue = query;
        const perPage = 20;
        const Page = page;

        dispatch(setInpName(searchValue));

        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/photo`,
          {
            params: {
              searchValue: searchValue,
              perPage: perPage,
              Page: Page,
            },
          }
        );
        if (!isCancelled) {
          const array = response.data.photosArray;
          const moreImages = response.data.itHasMore;
          dispatch(setPhotoArray(array));
          dispatch(isLoading(false));
          setItHasMore(moreImages);
        }
      } catch (error) {
        if (!isCancelled)
          console.error("Unable to get backend message:", error);
      }
      setLoading(false);
    }

    fetchPhotos();

    return () => {
      isCancelled = true;
    };
  }, [query, page, dispatch]);

  const lastImageRef = useCallback(
    (node) => {
      if (!itHasMore) return;
      if (loading1) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          console.log("setting page:", page);
          dispatch(setPageNum());
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading1]
  );

  return (
    <div className="body">
      <div className="title">
        <h2>{searchtext}</h2>
      </div>
      <Masonry
        breakpointCols={breakpointColumsObj}
        className="masonry-grid"
        columnClassName="masonry-grid_column"
      >
        <div className={loading ? "h load" : "none"}></div>
        <div className={loading ? "h load" : "none"}></div>
        <div className={loading ? "w load" : "none"}></div>
        <div className={loading ? "h load" : "none"}></div>
        <div className={loading ? "w load" : "none"}></div>
        <div className={loading ? "h load" : "none"}></div>
        <div className={loading ? "h load" : "none"}></div>
        <div className={loading ? "w load" : "none"}></div>
        <div className={loading ? "w load" : "none"}></div>
        <div className={loading ? "h load" : "none"}></div>
        {loading
          ? null
          : arrayOfPhotos.map((photo, index) => {
              if (arrayOfPhotos.length === index + 1) {
                return (
                  <ImgCard
                    key={photo.id}
                    ref={lastImageRef}
                    bgImg={photo.urls.small}
                    width={photo.width}
                    height={photo.height}
                    imgId={photo.id}
                    iIndex={index}
                  ></ImgCard>
                );
              }
              return (
                <ImgCard
                  key={photo.id}
                  bgImg={photo.urls.small}
                  width={photo.width}
                  height={photo.height}
                  imgId={photo.id}
                  iIndex={index}
                ></ImgCard>
              );
            })}
        {}
      </Masonry>
      {itHasMore ? (
        <div className="loading-circle">
          <div className="cir"></div>
          <div className="cir"></div>
          <div className="cir"></div>
          <div className="cir"></div>
        </div>
      ) : null}
    </div>
  );
}

export default ResultBody;
