import ImgHeader from "./img_header";
import ImgBody from "./img_body";
import ImgFooter from "./img_footer";
import RelPopUp from "../rel_popup";
import RevPopUp from "../rev_popup";
import AddPopUp from "../add_popup";
import DownloadPopup from "../downloadpopup";

function ImgPage() {
  return (
    <div className="fit">
      <ImgHeader></ImgHeader>
      <ImgBody></ImgBody>
      <ImgFooter></ImgFooter>
      <RelPopUp></RelPopUp>
      <RevPopUp></RevPopUp>
      <AddPopUp></AddPopUp>
      <DownloadPopup></DownloadPopup>
    </div>
  );
}

export default ImgPage;
