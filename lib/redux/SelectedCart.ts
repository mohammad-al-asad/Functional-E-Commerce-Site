import { createSlice } from "@reduxjs/toolkit";

const selectedCartSlice = createSlice({
  name: "selectedCart",
  initialState: { selectedCart: [] },
  reducers: {
    putItems: (state, action) => {
      state.selectedCart = action.payload;
    },
  },
});

export const { putItems } = selectedCartSlice.actions;
export default selectedCartSlice.reducer;
