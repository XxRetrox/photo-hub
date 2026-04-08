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
  default: 5,
  800: 3,
  500: 2,
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
  const observer = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    let isCancelled = false;
    dispatch(clearPhotos());
    async function onLoad() {
      console.log("first load");

      if (query) {
        const searchValue = query;
        const perPage = 5;
        const Page = 1;
        dispatch(setInpName(searchValue));
        try {
          // dispatch(clearPhotos());
          dispatch(isLoading(true));
          // navigate(`/results/${searchValue}`);

          const response = await axios.get(`http://localhost:5000/api/photo`, {
            params: {
              searchValue: searchValue,
              perPage: perPage,
              Page: Page,
            },
          });
          if (!isCancelled) {
            const array = response.data.photosArray;
            dispatch(setPhotoArray(array));
            dispatch(isLoading(false));
          }
        } catch (error) {
          if (!isCancelled)
            console.error("Unable to get backend message:", error);
        }
      }
    }

    onLoad();

    return () => {
      isCancelled = true;
    };
  }, [query, dispatch]);

  const lastImageRef = useCallback(
    (node) => {
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

  useEffect(() => {
    async function loadPhotos() {
      if (searchInp) {
        setLoading(true);
        const searchValue = searchInp;
        const perPage = 5;
        const Page = page;
        try {
          const response = await axios.get(`http://localhost:5000/api/photo`, {
            params: {
              searchValue: searchValue,
              perPage: perPage,
              Page: Page,
            },
          });
          const array = response.data.photosArray;
          dispatch(setPhotoArray(array));
        } catch (error) {
          console.error("Error fetching images:", error);
        }
        setLoading(false);
      }
    }

    loadPhotos();
  }, [page]);

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
        {arrayOfPhotos.map((photo, index) => {
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
      </Masonry>
      <div className="loading-circle">
        <div className="cir"></div>
        <div className="cir"></div>
        <div className="cir"></div>
        <div className="cir"></div>
      </div>
    </div>
  );
}

export default ResultBody;
