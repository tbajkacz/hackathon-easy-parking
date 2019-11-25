import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DatePickerCalendarProps {
  defaultDate: Date | null;
  name: string;
  handleDatePicker: (date: Date | null, name: string) => void;
  excludeTimes: Date[] | undefined;
}

const DatePickerCalendar: React.FC<DatePickerCalendarProps> = ({
  defaultDate,
  name,
  handleDatePicker,
  excludeTimes
}) => {
  return (
    <DatePicker
      className="date-picker pl-3 mb-2"
      selected={defaultDate}
      name={name}
      onChange={date => handleDatePicker(date, name)}
      onInputClick={() => {
        handleDatePicker(defaultDate, name);
      }}
      showTimeSelect
      dateFormat="MMMM d, yyyy h:mm aa"
      excludeTimes={excludeTimes}
    />
  );
};
export default DatePickerCalendar;
