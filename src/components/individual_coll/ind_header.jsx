import SearchBar from "../search_bar";
import Button from "../button";
import logo from "../../assets/logo.svg";

function IndHeader() {
  return (
    <div className="navbar fixed">
      <div className="logo-container">
        <img src={logo} alt="Company Logo" className="logo-img" />
      </div>
      <SearchBar></SearchBar>
      <Button bName="Home" rout="/"></Button>
      <Button bName="Collections" rout="/collections"></Button>
    </div>
  );
}

export default IndHeader;
