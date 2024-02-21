import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const MyCalendar = () => {
  // Define state for the date selected in the calendar
  const [date, setDate] = useState(new Date());

  // Function to handle date changes in the calendar
  const onChange = (selectedDate) => {
    setDate(selectedDate);
  };

  return (
    <div className="calendar-container">
      <h2>Calendar</h2>
      <Calendar
        onChange={onChange}
        value={date}
      />
      <p>Selected date: {date.toDateString()}</p>
    </div>
  );
};

export default MyCalendar;