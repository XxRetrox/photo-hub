import SearchBar from "../search_bar";
import Button from "../button";
import logo from "../../assets/Rx_logo.png";
import { Link } from "react-router-dom";

function CollectionHeader() {
  return (
    <div className="navbar fixed">
      <Link className="logo-link" to="/">
        <div className="logo-container">
          <img src={logo} alt="Company Logo" className="logo-img" />
        </div>
      </Link>

      <SearchBar></SearchBar>
      <Button bName="Home" rout="/"></Button>
    </div>
  );
}

export default CollectionHeader;
