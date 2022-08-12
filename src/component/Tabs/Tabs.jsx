import style from "./Tabs.module.scss";
import classNames from "classnames";
import { radioChecked } from "../../store/filterSlice";
import { useDispatch } from "react-redux";

const { background, check, checkedCheap, checkedFast } = style;

const Tabs = ({ radio }) => {
  const dispatch = useDispatch();
  const { cheap, fast } = radio;

  const cheapClass = cheap ? classNames(check, checkedCheap) : check;
  const fastClass = fast ? classNames(check, checkedFast) : check;
  
  return (
    <form className={background}>
      <div className={cheapClass}>
        <label>
          <input
            type="radio"
            name="origin"
            value="cheap"
            checked={cheap}
            onChange={() => dispatch(radioChecked())}
          />
          САМЫЙ ДЕШЕВЫЙ
        </label>
      </div>
      <div className={fastClass}>
        <label>
          <input
            type="radio"
            name="origin"
            value="fast"
            checked={fast}
            onChange={() => dispatch(radioChecked())}
          />
          САМЫЙ БЫСТРЫЙ
        </label>
      </div>
    </form>
  );
};

export default Tabs;
