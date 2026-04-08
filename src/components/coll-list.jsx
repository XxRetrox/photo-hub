import { useSelector } from "react-redux";

function CollList(props) {
  const coll = useSelector((state) => state.collection.collArray);
  const coll1 = useSelector((state) => state.collection.searchedColl);
  const isEmpty = useSelector((state) => state.boolean.isEmp);

  return (
    <div className="list-coll">
      {isEmpty ? (
        coll.map((col, index) => {
          return (
            <div
              onClick={() => props.addImgToCol(col.id, col.collection)}
              key={index}
              id={col.id}
              className="b"
            >
              <h4>{col.collection}</h4>
            </div>
          );
        })
      ) : coll1.length === 0 ? (
        <div className="b">
          <h4>No Collection Found</h4>
        </div>
      ) : (
        coll1.map((col, index) => {
          return (
            <div
              onClick={() => props.addImgToCol(col.id, col.collection)}
              key={index}
              id={col.id}
              className="b"
            >
              <h4>{col.collection}</h4>
            </div>
          );
        })
      )}
    </div>
  );
}

export default CollList;
