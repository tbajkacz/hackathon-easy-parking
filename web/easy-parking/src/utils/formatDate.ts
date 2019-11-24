import moment from "moment";

export const formatDate = (date: Date) => {
  return moment(date).format();
};

export const formatDateToDisplay = (date: Date, dateFormat = "HH:mm DD.MM.YY") => {
  return moment(date).format(dateFormat);
};
