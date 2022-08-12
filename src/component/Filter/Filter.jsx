import style from "./Filter.module.scss";
import withClass from "../../helper/withClass";
import React from "react";
import { useDispatch } from "react-redux";
import {
  checkedAll,
  checkedWithout,
  checkedOne,
  checkedTwo,
  checkedThree,
} from "../../store/filterSlice";

const { background, checkbox, option } = style;

const Filter = ({ checked }) => {
  const { all, ...other } = checked;
  const { without, one, two, three } = other;

  const checkAll = Object.values(other).every((el) => el === true) ? true : all;

  const dispatch = useDispatch();

  return (
    <React.Fragment>
      <p>Количество пересадок</p>
      <div className={option}>
        <label>
          <input
            type="checkbox"
            name="all"
            checked={checkAll}
            onChange={() => dispatch(checkedAll())}
          />
          <span className={checkbox}></span>
          Все
        </label>
      </div>
      <div className={option}>
        <label>
          <input
            type="checkbox"
            name="without-trans"
            checked={without}
            onChange={() => dispatch(checkedWithout())}
          />
          <span className={checkbox}></span>
          Без пересадок
        </label>
      </div>
      <div className={option}>
        <label>
          <input
            type="checkbox"
            name="one-trans"
            checked={one}
            onChange={() => dispatch(checkedOne())}
          />
          <span className={checkbox}></span>1 пересадка
        </label>
      </div>
      <div className={option}>
        <label>
          <input
            type="checkbox"
            name="two-trans"
            checked={two}
            onChange={() => dispatch(checkedTwo())}
          />
          <span className={checkbox}></span>2 пересадки
        </label>
      </div>
      <div className={option}>
        <label>
          <input
            type="checkbox"
            name="three-trans"
            checked={three}
            onChange={() => dispatch(checkedThree())}
          />
          <span className={checkbox}></span>3 пересадки
        </label>
      </div>
    </React.Fragment>
  );
};

export default withClass(Filter, background);
