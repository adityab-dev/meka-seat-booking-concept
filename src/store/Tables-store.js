import { createSlice, configureStore } from "@reduxjs/toolkit";

const tables = [];

for (let i = 0; i < 50; i += 1) {
  const table = {
    tableNum: i + 1,
    isBooked: false,
    timeRemaining: { hours: 0, minutes: 0, seconds: 0, totalTime: 0 },
    isMerged: false,
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
        isBooked = true;
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
      }
    },

    onAddTimer(state, action) {
      const { hours, minutes, seconds, tableNum } = action.payload;

      const totalTime = hours * 3600 + minutes * 60 + seconds - 1;

      const newHours = Math.floor(totalTime / 3600);
      const newMinutes = Math.floor(totalTime / 60) % 60;
      const newSeconds = Math.floor(totalTime % 60);

      const newTime = {
        hours: newHours,
        minutes: newMinutes,
        seconds: newSeconds,
        totalTime: totalTime,
      };

      // tableNum = index + 1
      const index = tableNum - 1;

      state.tables[index].timeRemaining = newTime;
    },
  },
});

const tablesStore = configureStore({
  reducer: { tables: tablesSlice.reducer },
});

export const tablesActions = tablesSlice.actions;
export default tablesStore;
