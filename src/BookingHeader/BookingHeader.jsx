import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { tablesActions } from "../store/Tables-store";

import "./BookingHeader.css";

function BookingHeader() {
  const [tablesToMerge, setTablesToMerge] = useState("");

  const { onMerge } = tablesActions;

  const dispatch = useDispatch();

  const inputChangeHandler = (event) => setTablesToMerge(event.target.value);

  const submitHandler = (event) => {
    event.preventDefault();

    dispatch(onMerge(tablesToMerge));
    setTablesToMerge("");
  };

  const headerTop = (
    <div className="colorsDescriptionContainer">
      <div className="colorsDescription">
        <div className="color">
          <div className="dotContainer redColor"></div>
          <div className="description">Reserved</div>
        </div>
        <div className="color">
          <div className="dotContainer greyColor"></div>
          <div className="description">Available</div>
        </div>
        <div className="color">
          <div className="dotContainer blueColor"></div>
          <div className="description">Merged</div>
        </div>
      </div>
    </div>
  );

  const headerForm = (
    <form
      onSubmit={submitHandler}
      className="mergeForm"
    >
      <div className="labelContainer">
        <label htmlFor="merge">Merge Table</label>
      </div>
      <div className="inputContainer">
        <input
          type="text"
          placeholder="Ex: 1,2,3"
          onChange={inputChangeHandler}
          value={tablesToMerge}
        />
        <button
          type="submit"
          id="merge"
        >
          Merge
        </button>
      </div>
    </form>
  );

  return (
    <header className="headerContainer">
      <section>{headerTop}</section>
      <section>{headerForm}</section>
    </header>
  );
}

export default BookingHeader;
