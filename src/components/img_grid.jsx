import Masonry from "react-masonry-css";
import { useSelector } from "react-redux";
import ImgCard from "./image_card";

const breakpointColumsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1,
};

function ImgGrid(props) {
  const loading = useSelector((state) => state.load.value);
  const arrayOfPhotos = useSelector((state) => state.photos.photoArray);

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
          <ImgCard
            key={index}
            bgImg={photo.urls.small}
            width={photo.width}
            height={photo.height}
            imgId={photo.id}
            iIndex={index}
          ></ImgCard>
        );
      })}
    </Masonry>
  );
}

export default ImgGrid;
