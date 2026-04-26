import Button from "../button";
import axios from "axios";
import { useEffect } from "react";
import { setRandom } from "../../state/searchnamesclice";
import { useDispatch, useSelector } from "react-redux";
import { isLoading } from "../../state/photosloadingsclice";
import { clearPhotos } from "../../state/photoslice";
import { setPhotoArray } from "../../state/photoslice";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/Rx_logo.png";
import { Link } from "react-router-dom";
import { setInpName } from "../../state/searchnamesclice";
import { resetPageNum } from "../../state/booleanslice";

function HomeHeader() {
  const ranWords = useSelector((state) => state.searchtext.random);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    async function onLoad() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/random`
        );
        const array = response.data.ranArray;
        dispatch(setRandom(array));
      } catch (error) {
        console.error("Error getting random nouns:", error);
      }
    }

    onLoad();
  }, []);

  const search = async function (word) {
    const searchValue = word;

    if (searchValue) {
      dispatch(setInpName(searchValue));

      dispatch(clearPhotos());
      dispatch(isLoading(true));
      dispatch(resetPageNum());
      navigate(`/results/${searchValue}`);
    }
  };

  return (
    <div className="navbar">
      <Link className="logo-link" to="/">
        <div className="logo-container">
          <img src={logo} alt="Company Logo" className="logo-img" />
        </div>
      </Link>
      {ranWords.slice(0, 3).map((ran, index) => {
        return (
          <div
            key={index}
            id={index}
            onClick={() => search(ran.word)}
            className="bar"
          >
            {ran.word}
          </div>
        );
      })}
      <div className="bar">
        <Button bName="Collection" rout="/collections"></Button>
      </div>
    </div>
  );
}

export default HomeHeader;
