import SearchBar from "../search_bar";
import Button from "../button";
import logo from "../../assets/logo.svg";

function ResultHeader() {
  return (
    <div className="navbar fixed">
      <div className="logo-container">
        <img src={logo} alt="Company Logo" className="logo-img" />
      </div>
      <SearchBar></SearchBar>
      <Button rout="/" bName="Home"></Button>
      <Button bName="Collection" rout="/collections"></Button>
    </div>
  );
}

export default ResultHeader;
