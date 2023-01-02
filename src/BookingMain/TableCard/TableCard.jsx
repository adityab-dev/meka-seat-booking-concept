import React from "react";

import "./TableCard.css";

function TableCard(props) {
  const { tableNum, isTableBooked, onAddTable } = props;

  return (
    <div
      className={`tableCardContainer ${
        isTableBooked ? "tableBooked" : "tableEmpty"
      }`}
      onClick={() => onAddTable(tableNum)}
    >
      <div className="tableCardHeader">Table</div>
      <div className="tableNumber"> {tableNum}</div>
    </div>
  );
}

export default TableCard;
