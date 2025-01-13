import { createSlice } from "@reduxjs/toolkit";

const roleSlice = createSlice({
  name: "role",
  initialState: {
    currentRole: null,
  },
  reducers: {
    setRole: (state, action) => {
      console.log("states==>", state, action);
      state.currentRole = action.payload;
    },
    clearRole: (state) => {
      state.currentRole = null;
    },
  },
});

export const { setRole, clearRole } = roleSlice.actions;
export default roleSlice.reducer;
