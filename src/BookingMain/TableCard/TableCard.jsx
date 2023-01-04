import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { tablesActions } from "../../store/Tables-store";

import "./TableCard.css";

function TableCard(props) {
  const { tableNum, isTableBooked, isTableMerged, isMergedWith } = props;

  const { onBooking, onReservationOver } = tablesActions;

  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);

  const [showTimeInputs, setShowTimeInput] = useState(undefined);

  const dispatch = useDispatch();

  useEffect(() => {
    const identifier = setTimeout(() => {
      if (seconds > 0) {
        setSeconds((seconds) => seconds - 1);
      }
      if (minutes > 0 && seconds === 0) {
        setMinutes((minutes) => minutes - 1);
        setSeconds(59);
      }
      if (hours > 0 && minutes === 0 && seconds === 0) {
        setHours((hours) => hours - 1);
        setMinutes(59);
        setSeconds(59);
      }
      if (seconds === 0 && minutes === 0 && hours === 0) {
        dispatch(onReservationOver({ tableNum, isMergedWith }));
      }

      return () => clearTimeout(identifier);
    }, 1000);
  }, [seconds, minutes, hours]);

  const addTimeHandler = () => setShowTimeInput(true);

  const submitHandler = (event) => {
    event.preventDefault();

    setSeconds();
    setShowTimeInput(undefined);

    if (!event.target[0].value) {
      if (!event.target[1].value) {
        if (!event.target[2].value) {
          return;
        }
      }
    }

    if (!event.target[0].value) {
      setHours(0);
    } else {
      setHours(event.target[0].value);
    }
    if (!event.target[1].value) {
      setMinutes(0);
    } else {
      setMinutes(event.target[1].value);
    }
    if (!event.target[2].value) {
      setSeconds(0);
    } else {
      setSeconds(event.target[2].value);
    }

    dispatch(onBooking(tableNum));
  };

  const timeForm = (
    <form
      onSubmit={submitHandler}
      className="timeInputForm"
    >
      <div className="formContentContainer">
        <label>Book For</label>
        <input
          type="number"
          placeholder="hh"
          min="00"
          max="23"
        />

        <input
          type="number"
          placeholder="mm"
          min="00"
          max="59"
        />

        <input
          type="number"
          placeholder="ss"
          min="00"
          max="59"
        />
      </div>
      <button
        type="submit"
        className="buttonEnabled"
      >
        Book
      </button>
    </form>
  );

  const timer = (
    <div className="timerContainer">
      {hours > 0 ? <div>{`${hours}h `}</div> : ""}
      {minutes > 0 ? <div>{`${minutes}m `} </div> : ""}
      {seconds > 0 ? <div>{seconds}s</div> : ""}
    </div>
  );

  const mergedTableNums = (tableNumsArr) => {
    const lengthOfArr = tableNumsArr.length;

    // tableNum = index + 1

    const firstNum = tableNumsArr[0];
    const lastNum = tableNumsArr[lengthOfArr - 1];

    // checking if 2 items only. current table num is placed first.
    if (lengthOfArr === 2) {
      if (tableNum < lastNum) {
        return (
          <div>
            {tableNum},{lastNum}
          </div>
        );
      } else {
        return (
          <div>
            {tableNum}, {firstNum}
          </div>
        );
      }
    }

    // returns in format first...last

    if (lengthOfArr > 2) {
      return (
        <div>
          {firstNum} - {lastNum}
        </div>
      );
    }
  };

  const mergedTableNumLabel = mergedTableNums(isMergedWith);

  const tableCardLayout = (
    <div
      className={`tableCardContainer ${
        isTableBooked ? "tableBooked" : "tableEmpty"
      } ${isTableMerged ? "tableMerged" : ""}`}
      onClick={!isTableBooked ? addTimeHandler : undefined}
    >
      <div className="tableCardHeader">Table</div>
      {!isMergedWith.length ? (
        <div className="tableNumber"> {tableNum}</div>
      ) : (
        <div className="tableNumber">{mergedTableNumLabel}</div>
      )}

      {timer}
    </div>
  );

  return <>{showTimeInputs ? timeForm : tableCardLayout}</>;
}

export default TableCard;
