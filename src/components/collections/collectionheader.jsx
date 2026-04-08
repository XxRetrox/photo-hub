import SearchBar from "../search_bar";
import Button from "../button";
import logo from "../../assets/logo.svg";

function CollectionHeader() {
  return (
    <div className="navbar fixed">
      <div class="logo-container">
        <img src={logo} alt="Company Logo" class="logo-img" />
      </div>
      <SearchBar></SearchBar>
      <Button bName="Home" rout="/"></Button>
    </div>
  );
}

export default CollectionHeader;
