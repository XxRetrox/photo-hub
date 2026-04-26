import { useSelector, useDispatch } from "react-redux";

function Button2(props) {
  const loading = useSelector((state) => state.load.isDL);
  const dispatch = useDispatch();

  return (
    <button
      disabled={loading}
      className={loading ? "bnt dis" : "bnt"}
      onClick={props.fName}
      type="button"
    >
      {props.bName}
    </button>
  );
}

export default Button2;
