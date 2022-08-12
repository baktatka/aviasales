import style from "./App.module.scss";
import Filter from "../Filter/Filter";
import Tabs from "../Tabs";
import Ticket from "../Ticket";

import withClass from "../../helper/withClass";

import logo from "./Logo.svg";
import React, { useEffect, useState } from "react";
import { fetchTicket, getId } from "../../store/fetchTicket";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { useSelector } from "react-redux";

import { selectTicketsByChecked } from "../../store/selectors";

const { wrapper, content, image, download, loading } = style;

const App = () => {
  const dispatch = useDispatch();

  const id = useSelector((state) => state.tickets.id);
  const error = useSelector((state) => state.tickets.error);
  const tickets = useSelector(selectTicketsByChecked);
  const checked = useSelector((state) => state.filter.checked);
  const status = useSelector((state) => state.tickets.status);
  const radio = useSelector((state) => state.filter.radio);

  const [index, setIndex] = useState(0);
  const [visibleData, setVisibleData] = useState([]);

  useEffect(() => {
    dispatch(getId());
  }, [dispatch]);

  useEffect(() => {
    if (error === "Ошибка сервера 404") {
      return;
    }
    if (error === "Ошибка сервера 500") {
      dispatch(fetchTicket(id));
    }
    if (error === "Все билеты загружены") {
      return;
    }
    dispatch(fetchTicket(id));
  }, [dispatch, id, error, tickets]);

  useEffect(() => {
    const numberOfItem = 5 * (index + 1);
    const newArray = [];

    tickets.forEach((ticket, i) => {
      if (i < numberOfItem) {
        newArray.push(ticket);
      }
      setVisibleData(newArray);
    });
  }, [index, tickets]);

  const loader =
    status === "loading" ? (
      <div className={loading}>Загрузка билетов...</div>
    ) : null;
  const content =
    tickets.length === 0 ? (
      <div className={loading}>
        Рейсов, подходящих под заданные фильтры, не найдено
      </div>
    ) : (
      visibleData.map((ticket, id) => (
        <Ticket key={id} ticket={ticket} status={status} />
      ))
    );
  const button =
    tickets.length === 0 ? null : (
      <button className={download} onClick={() => setIndex(index + 1)}>
        Загрузить еще
      </button>
    );

  return (
    <React.Fragment>
      <img className={image} src={logo} alt="logo" />
      <div className={wrapper}>
        <Filter checked={checked} />
        <div>
          <Tabs radio={radio} />
          {loader}
          {content}
          {button}
        </div>
      </div>
    </React.Fragment>
  );
};

export default withClass(App, content);
