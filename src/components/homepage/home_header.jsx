import Button from "../button";
import axios from "axios";
import { useEffect } from "react";
import { setRandom } from "../../state/searchnamesclice";
import { useDispatch, useSelector } from "react-redux";
import { isLoading } from "../../state/photosloadingsclice";
import { clearPhotos } from "../../state/photoslice";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.svg";

function HomeHeader() {
  const ranWords = useSelector((state) => state.searchtext.random);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    async function onLoad() {
      try {
        const response = await axios.get("http://localhost:5000/api/random");
        const array = response.data.ranArray;
        dispatch(setRandom(array));
      } catch (error) {
        console.error("Error get random nouns:", error);
      }
    }

    onLoad();
  }, []);

  const search = async function (word) {
    const searchValue = word;

    if (searchValue) {
      const perPage = 5;

      console.log(searchValue);
      try {
        dispatch(clearPhotos());
        dispatch(isLoading(true));
        navigate(`/results/${searchValue}`);

        const response = await axios.get(`http://localhost:5000/api/photo`, {
          params: {
            searchValue: searchValue,
            perPage: perPage,
          },
        });
        const array = response.data.photosArray;
        dispatch(setPhotoArray(array));
        dispatch(isLoading(false));
      } catch (error) {
        console.error("Unable to get backend message:", error);
      }
    }
  };

  return (
    <div className="navbar">
      <div className="logo-container">
        <img src={logo} alt="Company Logo" className="logo-img" />
      </div>
      {ranWords.map((ran, index) => {
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
      {/* <div className="bar">#List Collection</div>
      <div className="bar">#List Collection</div>
      <div className="bar">#List Collection</div> */}
      <div className="bar">
        <Button bName="Collections" rout="/collections"></Button>
      </div>
    </div>
  );
}

export default HomeHeader;
