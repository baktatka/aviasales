import { createAsyncThunk } from "@reduxjs/toolkit";

export const getId = createAsyncThunk("getId", async function () {
  const id = await fetch("https://front-test.dev.aviasales.ru/search");
  return await id.json();
});

export const fetchTicket = createAsyncThunk(
  "fetchTicket",
  async function (id, { rejectWithValue }) {
    if (id === null) {
      return [];
    }
    try {
      const result = await fetch(
        `https://front-test.dev.aviasales.ru/tickets?searchId=${id.searchId}`
      );

      if (result.status === 500) {
        throw new Error("Ошибка сервера 500");
      }
      if (result.status === 404) {
        throw new Error("Ошибка сервера 404");
      }
      const data = await result.json();
      console.log(data);
      if (data.stop) {
        throw new Error("Все билеты загружены");
      }
      return await data.tickets;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
