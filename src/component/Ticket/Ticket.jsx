import style from "./Ticket.module.scss";

import withClass from "../../helper/withClass";
import {
  formatPrice,
  formatTransfers,
  timeFormat,
  durationFormat,
} from "../../helper";
import { addMinutes } from "date-fns";
import React from "react";

const { background, header } = style;

const Ticket = ({ ticket, status }) => {
  const { price, carrier, segments } = ticket;

  return (
    <React.Fragment>
      <p>{formatPrice(price)}</p>
      <img src={`//pics.avs.io/99/36/${carrier}.png`} alt={carrier} />
      <table>{ticketInfo(segments)}</table>
    </React.Fragment>
  );
};

const ticketInfo = (array) => {
  return array.map((info, id) => {
    const { origin, destination, date, stops, duration } = info;

    const timeStart = new Date(date);
    const timeEnd = addMinutes(timeStart, duration);

    return (
      <React.Fragment key={id}>
        <tr className={header}>
          <td>{`${origin} - ${destination}`}</td>
          <td>в пути</td>
          <td>{formatTransfers(stops)}</td>
        </tr>
        <tr>
          <td>{timeFormat(timeStart, timeEnd)}</td>
          <td>{durationFormat(duration)}</td>
          <td>{stops.join(", ")}</td>
        </tr>
      </React.Fragment>
    );
  });
};

export default withClass(Ticket, background);
