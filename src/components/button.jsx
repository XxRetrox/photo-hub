import { Link } from "react-router-dom";

function Button(props) {
  return (
    <Link to={props.rout}>
      <button className="bnt" type="button">
        {props.bName}{" "}
      </button>
    </Link>
  );
}

export default Button;
