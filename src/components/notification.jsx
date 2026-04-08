import { useSelector, useDispatch } from "react-redux";
import { setShowNotify } from "../state/booleanslice";

function Notification() {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.boolean.showNotify);
  const colname = useSelector((state) => state.collection.imageColl);
  const actname = useSelector((state) => state.collection.action);

  setTimeout(() => {
    dispatch(setShowNotify(false));
  }, 2300);

  return (
    <div className={show ? "notify-con scale" : "notify-con"}>
      <p>
        Image {actname} <b>{colname}</b> collection
      </p>
    </div>
  );
}

export default Notification;
