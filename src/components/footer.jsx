import logoVideo from "../assets/video/logo.mp4";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { setRandom } from "../state/searchnamesclice";
import { isLoading } from "../state/photosloadingsclice";
import { setPhotoArray, clearPhotos } from "../state/photoslice";
import { setInpName } from "../state/searchnamesclice";
import { resetPageNum } from "../state/booleanslice";

function Footer(params) {
  const data = new Date();
  const year = data.getFullYear();

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
      dispatch(resetPageNum());
      dispatch(setInpName(searchValue));
      dispatch(clearPhotos());
      dispatch(isLoading(true));
      navigate(`/results/${searchValue}`);
    }
  };

  return (
    <div className="footer">
      <div className="footer-grid">
        {ranWords.map((ran, index) => {
          return (
            <div
              key={index}
              id={index}
              onClick={() => search(ran.word)}
              className="f"
            >
              {ran.word}
            </div>
          );
        })}
      </div>
      <div className="footer-logo">
        <video autoPlay muted loop playsInline className="responsive-video">
          <source src={logoVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="footer-copy">
        <p>&copy; {year} xRx. All rights reserved.</p>
      </div>
    </div>
  );
}

export default Footer;
