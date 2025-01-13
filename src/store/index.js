import { configureStore } from "@reduxjs/toolkit";
import roleReducer from "./roleSlice";

const store = configureStore({
  reducer: {
    role: roleReducer,
  },
});

store.subscribe(() => {
  console.log("Redux state:", store.getState());
});

export default store;
