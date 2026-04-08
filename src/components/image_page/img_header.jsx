import Button from "../button";
import SearchBar from "../search_bar";
import logo from "../../assets/logo.svg";

function ImgHeader() {
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

export default ImgHeader;
