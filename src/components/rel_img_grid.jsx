import Masonry from "react-masonry-css";
import { useSelector } from "react-redux";
import RelImgCard from "./rel_img_card";

const breakpointColumsObj = {
  default: 5,
  800: 3,
  500: 2,
};

function RelImgGrid(props) {
  const loading = useSelector((state) => state.load.value);
  const arrayOfRelPhotos = useSelector((state) => state.relphotos.imageArray);

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
      {arrayOfRelPhotos.map((photo, index) => {
        return (
          <RelImgCard
            key={index}
            bgImg={photo.urls.small}
            width={photo.width}
            height={photo.height}
            imgId={photo.id}
            iIndex={index}
          ></RelImgCard>
        );
      })}
    </Masonry>
  );
}

export default RelImgGrid;
