import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./filterSlice";
import ticketReducer from "./ticketSlice";

export default configureStore({
  reducer: {
    filter: filterReducer,
    tickets: ticketReducer,
  },
});
