import { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { isEmpty } from "../../state/emptyslice";
import { setPhotoArray, clearPhotos } from "../../state/photoslice";
import { useSelector, useDispatch } from "react-redux";
import { setInpName } from "../../state/searchnamesclice";
import { isLoading } from "../../state/photosloadingsclice";
import { setText, clearText } from "../../state/inputtextslice";
import React, { useMemo, useEffect } from "react";
import { setSuggArray, clearSugg } from "../../state/suggslice";
import { resetPageNum } from "../../state/booleanslice";

function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

function HomeBody() {
  const empty = useSelector((state) => state.empState.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputQuery = useRef(null);
  const arrayOfSugg = useSelector((state) => state.sugg.suggArray);
  const inpText = useSelector((state) => state.text.value);

  const debouncedLog = useMemo(
    () =>
      debounce(async (val) => {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/sugg/${val}`
          );
          const array = response.data.suggArray;

          dispatch(setSuggArray(array));
        } catch (error) {
          console.error("Unable to get backend message:", error);
        }
      }, 300),
    []
  );

  async function search() {
    var searchValue = "";

    if (inputQuery.current) {
      if (inputQuery.current.value !== "") {
        dispatch(resetPageNum());

        dispatch(isEmpty(false));
        searchValue = inputQuery.current.value;
        dispatch(setInpName(searchValue));
        dispatch(clearText());
        dispatch(clearSugg());
        dispatch(clearPhotos());
        dispatch(isLoading(true));
        navigate(`/results/${searchValue}`);
      } else {
        dispatch(isEmpty(true));
        setTimeout(() => {
          dispatch(isEmpty(false));
        }, 5000);
      }
    }
  }

  async function auto(e) {
    const { type, value } = e.target;
    dispatch(setText(value));
    if (type === "text" && value.length > 2) {
      debouncedLog(value);
    } else {
      dispatch(clearSugg());
    }
  }

  async function querySugg(e) {
    if (e.target.innerText) {
      dispatch(resetPageNum());

      const searchValue = e.target.innerText;
      dispatch(setInpName(searchValue));
      dispatch(clearText());
      dispatch(clearSugg());
      dispatch(clearPhotos());
      dispatch(isLoading(true));
      navigate(`/results/${searchValue}`);
    }
  }

  return (
    <div className="home-body">
      <div className="about">
        <p>
          Free Fanatatic Photos and Wallpapers for Your Needs -- Over a Million
          Images From Unsplash
        </p>
      </div>
      <div className="search-box">
        <input
          ref={inputQuery}
          className="search-bnt"
          placeholder="Search your desired image"
          type="text"
          name="sImg"
          id=""
          onChange={auto}
          value={inpText}
          autoComplete="off"
        />
        <div className="s-bnt">
          <button onClick={search} type="button" className="ss-bnt">
            S
          </button>
        </div>
        <div className={empty ? "artl artl1" : "artl"}>
          <p className="alrt-message">Input Required</p>
        </div>
        <div className="sugg">
          {arrayOfSugg.map((sugg, index) => {
            return (
              <div
                className="sugg-itm"
                onClick={querySugg}
                key={index}
                id={index}
              >
                {sugg}
              </div>
            );
          })}
        </div>
      </div>
      <div className="backdrop">
        <div className="back-drop"></div>
      </div>
    </div>
  );
}

export default HomeBody;
