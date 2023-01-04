import { createSlice, configureStore } from "@reduxjs/toolkit";

const tables = [];

for (let i = 0; i < 50; i += 1) {
  const table = {
    tableNum: i + 1,
    isBooked: false,
    isMerged: false,
    isMergedWith: [],
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

      // checks if already booked
      let isBooked = false;

      if (state.tables[tableNum - 1].isBooked === true) {
        return;
      }

      if (!isBooked) {
        state.tables[index].isBooked = true;
      }
    },

    onMerge(state, action) {
      const tableNumString = action.payload;

      // converts string into arr. of numbers.

      const tableNumArrString = tableNumString.split(",");

      const tableNumArr = tableNumArrString.map((el) => +el);

      console.log("tableNumArr", tableNumArr);

      // if array conmtains non-nums.

      let containsNonNums = false;

      tableNumArr.forEach((tableNum) => {
        if (!tableNum) {
          containsNonNums = true;
        }
      });

      if (containsNonNums) return;

      // if array items contains tableNum === 0

      if (tableNumArr.includes(0)) {
        return;
      }

      // to check whether tables are in consecutive nums.

      let areConsecutive = false;

      if (tableNumArr.length === 1) {
        areConsecutive = true;
      } else {
        for (let index = 0; index <= tableNumArr.length - 2; index += 1) {
          if (!(tableNumArr[index + 1] - tableNumArr[index] === 1)) {
            areConsecutive = false;
            return;
          }
          areConsecutive = true;
        }
      }

      console.log("areConsecutive", areConsecutive);

      // to check whether tables are booked or not

      let areBooked = false;

      tableNumArr.forEach((tableNum) => {
        if (!state.tables[tableNum].isBooked === true) {
          return;
        }
        areBooked = true;
      });

      console.log("areBooked", areBooked);

      // checks numbers are already in array.

      let arePresent = false;

      function doesInclude(Arr, num) {
        if (Arr.includes(num)) {
          arePresent = true;
        }
      }

      tableNumArr.forEach((tableNum) => {
        doesInclude(state.mergedTablesArr, tableNum);
      });

      console.log("arePresent", arePresent);

      // checks if already merged

      let areMerged = false;

      tableNumArr.forEach((tableNum) => {
        if (state.tables[tableNum].isMerged === true) {
          areMerged = true;
        }
      });

      console.log("areMerged", areMerged);

      //  passes all checks becomes eligible.
      const areEligible =
        areBooked && areConsecutive && !arePresent && !areMerged;

      console.log("areEligible", areEligible);

      if (areEligible) {
        state.mergedTablesArr.push(...tableNumArr);
        tableNumArr.forEach((tableNum) => {
          state.tables[tableNum - 1].isMerged = true;
        });
        tableNumArr.forEach((tableNum) => {
          state.tables[tableNum - 1].isMergedWith = tableNumArr;
        });
      }
    },

    onReservationOver(state, action) {
      const { tableNum, isMergedWith } = action.payload;

      // tableNum = index + 1
      const index = tableNum - 1;

      state.tables[index].isBooked = false;
      state.tables[index].isMerged = false;

      // clears arr of current index.
      state.tables[index].isMergedWith = [];

      // clears others array of current item.

      const currentItemIndex = isMergedWith.indexOf(tableNum);

      const newIsMergedWith = [...isMergedWith];

      newIsMergedWith.splice(currentItemIndex, 1);

      isMergedWith.forEach((mergedItem) => {
        state.tables[mergedItem].isMergedWith = newIsMergedWith;
      });
    },
  },
});

const tablesStore = configureStore({
  reducer: { tables: tablesSlice.reducer },
});

export const tablesActions = tablesSlice.actions;
export default tablesStore;
