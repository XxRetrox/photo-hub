import IndBody from "./ind_body";
import IndFooter from "./ind_footer";
import IndHeader from "./ind_header";
import IndColPopUp from "../indcol_popup";

function IndColl() {
  return (
    <div className="fit">
      <IndHeader></IndHeader>
      <IndBody></IndBody>
      <IndFooter></IndFooter>
      <IndColPopUp></IndColPopUp>
    </div>
  );
}

export default IndColl;
