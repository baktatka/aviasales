import { createSelector } from "@reduxjs/toolkit";
import { ticketsFilter } from "../helper";

export const tickets = (state) => state.tickets.tickets;
export const checked = (state) => state.filter.checked;
export const radio = (state) => state.filter.radio;

export const selectTicketsByChecked = createSelector(
  [tickets, checked, radio],
  (allTickets, activeCheked, activeRadio) => {
    if (activeRadio.cheap) {
      const array = [...allTickets];
      allTickets = array.sort((a, b) => {
        return a.price - b.price;
      });
    }
    if (activeRadio.fast) {
      const array = [...allTickets];
      allTickets = array.sort((a, b) => {
        const { segments: aSegments } = a;
        const { segments: bSegments } = b;
        const [firstA, secondA] = aSegments;
        const [firstB, secondB] = bSegments;
        return (
          firstA.duration +
          secondA.duration -
          (firstB.duration + secondB.duration)
        );
      });
    }
    if (
      !activeCheked.all &&
      !activeCheked.without &&
      !activeCheked.one &&
      !activeCheked.two &&
      !activeCheked.three
    ) {
      allTickets = ticketsFilter(allTickets, 4);
    }
    if (activeCheked.all) {
      return allTickets;
    }
    if (!activeCheked.without) {
      allTickets = ticketsFilter(allTickets, 0);
    }

    if (!activeCheked.one) {
      allTickets = ticketsFilter(allTickets, 1);
    }
    if (!activeCheked.two) {
      allTickets = ticketsFilter(allTickets, 2);
    }
    if (!activeCheked.three) {
      allTickets = ticketsFilter(allTickets, 3);
    }
    return allTickets;
  }
);
