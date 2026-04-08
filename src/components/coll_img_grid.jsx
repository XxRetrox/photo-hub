import Masonry from "react-masonry-css";
import { useSelector, useDispatch } from "react-redux";
import ColImgCard from "./coll_img_card";
import { setColImg } from "../state/coll-nameslice";
import { isLoading } from "../state/photosloadingsclice";
import axios from "axios";
import React, { useState, useEffect } from "react";

const breakpointColumsObj = {
  default: 5,
  800: 3,
  500: 2,
};

function ColImgGrid(props) {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.load.value);
  const colId = props.id;
  const [arrayOfColPhotos, setArrayOfColPhotos] = useState([]);

  useEffect(() => {
    async function onLoad() {
      dispatch(isLoading(true));
      try {
        const response = await axios.get(
          `http://localhost:5000/api/collimages/${colId}`
        );
        const array = response.data.collArray;
        setArrayOfColPhotos(array);
        dispatch(isLoading(false));
      } catch (error) {
        console.error("Error retrieving coll images:", error);
      }
    }

    onLoad();
  }, []);

  return (
    <Masonry
      breakpointCols={breakpointColumsObj}
      className="masonry-grid mg"
      columnClassName="masonry-grid_column"
    >
      <div className={loading ? "h load" : "none"}></div>
      <div className={loading ? "h load" : "none"}></div>
      <div className={loading ? "w load" : "none"}></div>
      {arrayOfColPhotos.map((photo, index) => {
        return (
          <ColImgCard
            key={index}
            bgImg={photo.img_url}
            width={photo.img_w}
            height={photo.img_h}
            imgId={photo.img_id}
            iIndex={index}
          ></ColImgCard>
        );
      })}
    </Masonry>
  );
}

export default ColImgGrid;
