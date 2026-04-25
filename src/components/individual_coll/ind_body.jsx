import IndColGrid from "../indcol_img_grid";
import { useSelector } from "react-redux";
import axios from "axios";
import { setColImg } from "../../state/coll-nameslice";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { isLoading } from "../../state/photosloadingsclice";

function IndBody() {
  const collText = useSelector((state) => state.colName.text);
  const collId = useSelector((state) => state.colName.colid);
  const dispatch = useDispatch();
  const { coll_id, coll_name } = useParams();

  useEffect(() => {
    async function onLoad() {
      var mixCollId;
      if (collId === "") {
        mixCollId = `${coll_id}_diff`;
      } else {
        mixCollId = `${collId}_diff`;
      }

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/collimages/${mixCollId}`
        );
        const array = response.data.collArray;
        dispatch(setColImg(array));
        dispatch(isLoading(false));
      } catch (error) {
        console.error("Error retrieving coll images:", error);
      }
    }

    onLoad();
  }, []);

  return (
    <div className="body">
      <div className="about a">
        {collText ? <h2>{collText}</h2> : <h2>{coll_name}</h2>}
      </div>
      <div>
        <IndColGrid></IndColGrid>
      </div>
    </div>
  );
}

export default IndBody;
