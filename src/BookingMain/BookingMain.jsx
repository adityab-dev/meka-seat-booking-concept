import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { tablesActions } from "../store/Tables-store";

import TableCard from "./TableCard/TableCard";

import "./BookingMain.css";

function BookingMain() {
  const tables = useSelector((state) => state.tables.tables);

  const dispatch = useDispatch();

  const addTableHandler = (id) => dispatch(tablesActions.onBooking(id));

  const TableCardList = tables.map((table, index) => {
    return (
      <TableCard
        timeRemaining={table.timeRemaining}
        onAddTable={addTableHandler}
        tableNum={table.tableNum}
        isTableBooked={table.isBooked}
        key={index}
      />
    );
  });

  return <main className="main">{TableCardList}</main>;
}

export default BookingMain;
