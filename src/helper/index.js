import { format, minutesToHours } from "date-fns";

export const formatPrice = (price) => {
  return String(price).replace(/(^..)/, "$& ") + " P";
};

export const formatTransfers = (array) => {
  const count = array.length;

  switch (count) {
    case 0:
      return "Без пересадок";
    case 1:
      return "1 пересадка";
    case 2:
    case 3:
      return `${count} пересадки`;

    default:
      return count;
  }
};

export const timeFormat = (dateStart, dateEnd) => {
  const start = format(dateStart, "HH:mm");
  const end = format(dateEnd, "HH:mm");
  return `${start} - ${end}`;
};

export const durationFormat = (duration) => {
  const hours = minutesToHours(duration);
  const minutes = duration - hours * 60;

  return `${hours}ч ${minutes}м`;
};

export const ticketsFilter = (tickets, num) => {
  return tickets.filter((info) => {
    const { segments } = info;
    const [first, second] = segments;
    return !(first.stops.length === num || second.stops.length === num);
  });
};
