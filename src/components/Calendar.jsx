import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { clockIn, clockOut } from './clockApi.jsx';

const ClockComponent = ({ userId, timestamp }) => {
  const handleClockIn = async () => {
    try {
      const response = await clockIn(userId, timestamp);
      console.log('Clock in success:', response);
    } catch (error) {
      console.error('Clock in failed:', error);
    }
  };

  const handleClockOut = async () => {
    try {
      const response = await clockOut(userId, timestamp);
      console.log('Clock out success:', response);
    } catch (error) {
      console.error('Clock out failed:', error);
    }
  };

  return (
    <div>
      <button onClick={handleClockIn}>Clock In</button>
      <button onClick={handleClockOut}>Clock Out</button>
    </div>
  );
};

const MyCalendar = ({ userId }) => {
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
      <ClockComponent userId={userId} timestamp={date} />
    </div>
  );
};

export default MyCalendar;