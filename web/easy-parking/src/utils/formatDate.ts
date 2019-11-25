import moment from "moment";

export const formatDate = (date: Date, dateFormat = "HH:mm DD.MM.YY") => {
  return moment(date).format(dateFormat);
};
