import { createSlice } from "@reduxjs/toolkit";
import { fetchTicket, getId } from "./fetchTicket";

const ticketSlice = createSlice({
  name: "tickets",
  initialState: {
    id: null,
    tickets: [],
    status: null,
    error: "null",
  },
  reducers: {},
  extraReducers: {
    [getId.fulfilled]: (state, action) => {
      state.id = action.payload;
    },
    [fetchTicket.pending]: (state, action) => {
      state.status = "loading";
      state.error = null;
    },
    [fetchTicket.fulfilled]: (state, action) => {
      state.tickets.push(...action.payload);
      state.status = "resived";
      state.error = null;
    },
    [fetchTicket.rejected]: (state, action) => {
      state.error = action.payload;
      state.status = "rejected";
    },
  },
});

export const { withoutTickets } = ticketSlice.actions;

export default ticketSlice.reducer;
