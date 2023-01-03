import React, { useState, useEffect, useRef } from "react";

import "./TableCard.css";

function TableCard(props) {
  const { tableNum, isTableBooked, timeRemaining } = props;

  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);

  const [showTimeInputs, setShowTimeInput] = useState(false);

  useEffect(() => {
    let identifier = setTimeout(() => {
      if (seconds > 0) {
        setSeconds((seconds) => seconds - 1);
      }
      if (minutes > 0 && seconds === 0) {
        setMinutes((minutes) => minutes - 1);
        setSeconds(5);
      }
      if (hours > 0 && minutes === 0 && seconds === 0) {
        setHours((hours) => hours - 1);
        setMinutes(5);
        setSeconds(5);
      }

      return () => clearTimeout(identifier);
    }, 1000);
  }, [seconds]);

  // const secondsInputRef = useRef();
  // const minutesInputRef = useRef();
  // const hoursInputRef = useRef();

  const hoursChangeHandler = (event) => setHours(+event.target.value);
  const minutesChangeHandler = (event) => setMinutes(+event.target.value);
  const secondsChangeHandler = (event) => setSeconds(+event.target.value);

  let isValidInputs = false;
  // if (hours || minutes || seconds) {
  //   isValidInputs = true;
  // }

  const addTimeHandler = () => setShowTimeInput(true);

  const submitHandler = (event) => {
    event.preventDefault();

    console.log(event);

    setShowTimeInput(false);
    setHours(event.target[0].value);
    setMinutes(event.target[1].value);
    setSeconds(event.target[2].value);
  };

  const timeForm = (
    <form onSubmit={submitHandler}>
      <div>
        <label>Book For</label>
        <input
          type="number"
          placeholder="hh"
          min="00"
          max="23"
          // ref={hoursInputRef}
          onChange={hoursChangeHandler}
        />

        <input
          type="number"
          placeholder="mm"
          min="00"
          max="59"
          onChange={minutesChangeHandler}
          // ref={minutesInputRef}
        />

        <input
          type="number"
          placeholder="ss"
          min="00"
          max="59"
          onChange={secondsChangeHandler}
          // ref={secondsInputRef}
        />
      </div>
      <button
        type="submit"
        // className={`${isValidInputs ? "buttonEnabled" : "buttonDisabled"} `}
      >
        Book
      </button>
    </form>
  );

  const tableCardLayout = (
    <div
      className={`tableCardContainer ${
        isTableBooked ? "tableBooked" : "tableEmpty"
      }`}
      // onClick={() => onAddTable(tableNum)}
      onClick={addTimeHandler}
    >
      <div className="tableCardHeader">Table</div>
      <div className="tableNumber"> {tableNum}</div>
    </div>
  );

  const timer = (
    <div>
      <div>{hours}</div>
      <div>{minutes}</div>
      <div>{seconds}</div>
    </div>
  );

  return (
    <>
      {showTimeInputs ? timeForm : tableCardLayout}
      {timer}
    </>
  );
}

export default TableCard;
