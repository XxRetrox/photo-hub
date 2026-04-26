import { useDispatch, useSelector } from "react-redux";
import { setInputColText } from "../state/inputtextslice";
import { setEmptyState } from "../state/booleanslice";
import React, { useMemo } from "react";
import { setSearchedColl } from "../state/collslice";

function debounce(func, timeout = 250) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

function InputSearch() {
  const dispatch = useDispatch();
  const inp = useSelector((state) => state.text.inputcol);
  const colarray = useSelector((state) => state.collection.collArray);

  const debouncedSearch = useMemo(
    () =>
      debounce(async (val) => {
        const result = colarray.filter((item) =>
          item.collection.toLowerCase().includes(val.toLowerCase())
        );
        dispatch(setSearchedColl(result));
      }, 250),
    [colarray, dispatch]
  );

  function search(e) {
    const { type, value } = e.target;

    dispatch(setInputColText(value));
    if (value === "") {
      dispatch(setEmptyState(true));
    } else {
      debouncedSearch(value);
      dispatch(setEmptyState(false));
    }
  }

  return (
    <input
      onChange={search}
      placeholder="search a collection"
      type="text"
      name=""
      value={inp}
      id=""
      className="search-bnt g1"
    />
  );
}

export default InputSearch;
