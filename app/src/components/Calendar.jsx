import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import ClockComponent from './ClockComponent';

const MyCalendar = ({ jwtToken }) => {
  const handleDateChange = (selectedDate) => {
    console.log('Selected date:', selectedDate);
  };

  return (
    <div className="calendar-container">
      <h2>Calendar</h2>
      <Calendar onChange={handleDateChange} />
      <ClockComponent jwtToken={jwtToken} />
    </div>
  );
};

export default MyCalendar;