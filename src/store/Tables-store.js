import { createSlice, configureStore } from "@reduxjs/toolkit";

const tables = [];

for (let i = 0; i < 50; i += 1) {
  const table = {
    tableNum: i + 1,
    isBooked: false,
    timeRemaining: 0,
    mergedTableCards: [],
  };
  tables.push(table);
}

const initialTablesState = { tables: tables, mergedTablesArr: [] };

const tablesSlice = createSlice({
  name: "Tables",
  initialState: initialTablesState,
  reducers: {
    onBooking(state, action) {
      const tableNum = action.payload;

      // tableNum = index + 1
      const index = tableNum - 1;

      state.tables[index].isBooked = true;
    },
    onMerge(state, action) {
      const tableNumString = action.payload;

      const tableNumArrString = tableNumString.split(",");

      const tableNumArr = tableNumArrString.map((el) => +el);

      state.mergedTablesArr.push(...tableNumArr);

      //  to check whether items input are already present
    },
  },
});

const tablesStore = configureStore({
  reducer: { tables: tablesSlice.reducer },
});

export const tablesActions = tablesSlice.actions;
export default tablesStore;
