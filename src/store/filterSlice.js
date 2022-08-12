import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: {
    checked: {
      all: true,
      without: true,
      one: true,
      two: true,
      three: true,
    },
    radio: {
      cheap: true,
      fast: false,
    },
  },
  reducers: {
    radioChecked(state) {
      state.radio = {
        cheap: !state.radio.cheap,
        fast: !state.radio.fast,
      };
    },
    checkedAll(state) {
      const { all, without, one, two, three } = state.checked;

      if (all) {
        state.checked = {
          all: !all,
          without: !without,
          one: !one,
          two: !two,
          three: !three,
        };
      } else {
        state.checked = {
          all: !all,
          without: true,
          one: true,
          two: true,
          three: true,
        };
      }
    },

    checkedWithout(state) {
      state.checked = {
        ...state.checked,
        all: false,
        without: !state.checked.without,
      };
    },

    checkedOne(state) {
      state.checked = {
        ...state.checked,
        all: false,
        one: !state.checked.one,
      };
    },

    checkedTwo(state) {
      state.checked = {
        ...state.checked,
        all: false,
        two: !state.checked.two,
      };
    },

    checkedThree(state) {
      state.checked = {
        ...state.checked,
        all: false,
        three: !state.checked.three,
      };
    },
  },
});

export const {
  checkedAll,
  checkedWithout,
  checkedOne,
  checkedTwo,
  checkedThree,
  radioChecked,
} = filterSlice.actions;

export default filterSlice.reducer;
