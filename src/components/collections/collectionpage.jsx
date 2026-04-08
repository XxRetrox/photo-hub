import CollectionHeader from "./collectionheader";
import CollectionFooter from "./collectionfooter";
import CollectionBody from "./collectionbody";
import ColPopUp from "../collpopup";

function CollectionPage() {
  return (
    <div className="fit">
      <CollectionHeader></CollectionHeader>
      <CollectionBody></CollectionBody>
      <CollectionFooter></CollectionFooter>
      <ColPopUp></ColPopUp>
    </div>
  );
}

export default CollectionPage;
