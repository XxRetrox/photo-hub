import { useSelector, useDispatch } from "react-redux";
import { setIsApiLimited, setResetTime } from "../state/booleanslice";
import { useState } from "react";

function ApiAlert() {
  const dispatch = useDispatch();
  const alrMsg = useSelector((state) => state.boolean.apiErrorMsg);
  var time = useSelector((state) => state.boolean.resetTime);
  const [mins, setMins] = useState("");
  const [sec, setSec] = useState("");

  const timeRemaining = setInterval(() => {
    if (time >= 1) {
      setMins(Math.floor(time / 60));
      setSec(time % 60);
      dispatch(setResetTime((time -= 1)));
    } else {
      clearInterval(timeRemaining);
      // console.log("interval cleared");
      dispatch(setIsApiLimited(false));
    }
  }, 1000);

  return (
    <div className="alert-body">
      <div className="alert-contents">
        <div className="alert-message">
          <p>{alrMsg}</p>
        </div>
        <div className="alert-time">
          <p>
            Api Resets in {mins}minutes {sec}secounds.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ApiAlert;
