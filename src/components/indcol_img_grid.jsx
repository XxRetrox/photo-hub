import Masonry from "react-masonry-css";
import { useSelector } from "react-redux";
import IndColImgCard from "./indcol_image_card";
const breakpointColumsObj = {
  default: 5,
  800: 3,
  500: 2,
};

function IndColGrid(props) {
  const loading = useSelector((state) => state.load.value);
  const arrayOfPhotos = useSelector((state) => state.colName.colimg);

  return (
    <Masonry
      breakpointCols={breakpointColumsObj}
      className="masonry-grid mg"
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
        return (
          <IndColImgCard
            key={index}
            bgImg={photo.img_url}
            width={photo.img_w}
            height={photo.img_h}
            imgId={photo.img_id}
            iIndex={index}
          ></IndColImgCard>
        );
      })}
    </Masonry>
  );
}

export default IndColGrid;
