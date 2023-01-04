import React from "react";
import { useSelector } from "react-redux";

import TableCard from "./TableCard/TableCard";

import "./BookingMain.css";

function BookingMain() {
  const tables = useSelector((state) => state.tables.tables);

  const TableCardList = tables.map((table, index) => {
    return (
      <TableCard
        isMergedWith={table.isMergedWith}
        isTableMerged={table.isMerged}
        tableNum={table.tableNum}
        isTableBooked={table.isBooked}
        key={index}
      />
    );
  });

  return (
    <main className="main">
      <div className="mainContainer">{TableCardList}</div>
    </main>
  );
}

export default BookingMain;
