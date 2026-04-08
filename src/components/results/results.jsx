import ResultHeader from "./result_header";
import ResultBody from "./result_body";
import ResultFooter from "./result_footer";
import PopUp from "../popup";
import DownloadPopup from "../downloadpopup";

function Results() {
  return (
    <div className="fit">
      <ResultHeader></ResultHeader>
      <ResultBody></ResultBody>
      <ResultFooter></ResultFooter>
      <PopUp></PopUp>
      <DownloadPopup></DownloadPopup>
    </div>
  );
}

export default Results;
