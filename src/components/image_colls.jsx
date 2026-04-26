import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setColName, setColId } from "../state/coll-nameslice";

function ImageColl() {
  const imageColl = useSelector((state) => state.collection.revCollArray);
  const det = useSelector((state) => state.boolean.value2);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function showColl(colId, colName) {
    dispatch(setColName(colName));
    dispatch(setColId(colId));
    navigate(`/indcoll/${colId}/${colName}`);
  }

  return (
    <div>
      {Array.isArray(imageColl) && imageColl.length !== 0 ? (
        <div className="coll-list">
          <div className="tag-head">
            <p>All collection(s) this image belongs to</p>
          </div>
          <div className="collections">
            {imageColl.map((col, index) => {
              return (
                <div
                  onClick={() => showColl(col.coll_id, col.coll_name)}
                  key={index}
                  id={col.coll_id}
                  className="col-pill"
                >
                  {col.coll_name}
                </div>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default ImageColl;
