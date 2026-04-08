import ColImgGrid from "../coll_img_grid";
import { setColName, setCol, setColId } from "../../state/coll-nameslice";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useEffect } from "react";

function CollectionBody() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const coll = useSelector((state) => state.colName.colsort);

  function viewCollection(e) {
    console.log(e.target.innerText);
    console.log(e.currentTarget.id);
    dispatch(setColName(e.target.innerText));
    dispatch(setColId(e.currentTarget.id));
    navigate(`/indcoll/${e.currentTarget.id}/${e.target.innerText}`);
  }

  useEffect(() => {
    async function onLoad() {
      try {
        const response = await axios.get("http://localhost:5000/api/collname");
        const array = response.data.collArray;
        dispatch(setCol(array));
      } catch (error) {
        console.error("Error retrieving coll names:", error);
      }
    }

    onLoad();
  }, []);

  return (
    <div className="body">
      <div className="about a">
        <h2>All Collections</h2>
      </div>
      <div className="col-box">
        {coll.map((col, index) => {
          return (
            <div key={index} className="coll">
              <div
                onClick={viewCollection}
                className="coll-name"
                id={col.coll_id}
              >
                <h3 id="sub">{col.coll_name}</h3>
              </div>
              <div className="coll-img">
                <ColImgGrid id={col.coll_id}></ColImgGrid>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CollectionBody;
