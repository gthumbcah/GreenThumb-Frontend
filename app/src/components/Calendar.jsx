import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const MyCalendar = () => {
  const [date, setDate] = useState(new Date());
  const [jobsData, setJobsData] = useState([]);

useEffect(() => {
  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://greenthumb-backend.onrender.com/jobs', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        setJobsData(data);
        console.log(data);
      } else {
        console.log('Failed to find Jobs');
      }
    } catch (error) {
      console.error('Error finding Jobs:', error);
    }
  };

  fetchData();
}, []);


  // Function to check if there is a job scheduled for a specific date
  const isJobScheduled = (checkDate) => {
    return jobsData.some(job => {
      const jobDate = new Date(job.dates[0]); // Assuming job date is the first date in the dates array
      return jobDate.toDateString() === checkDate.toDateString();
    });
  };

  // Function to handle date changes in the calendar
  const onChange = (selectedDate) => {
    setDate(selectedDate);
  };

  // Function to customize tile content to add markers for days with jobs
  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const checkDate = new Date(date);
      if (isJobScheduled(checkDate)) {
        return <p style={{ backgroundColor: 'red', borderRadius: '50%', width: '0.5rem', height: '0.5rem' }}></p>;
      }
    }
    return null;
  };

  return (
    <div className="calendar-container">
      <h2>Calendar</h2>
      <Calendar
        onChange={onChange}
        value={date}
        tileContent={tileContent}
      />
      <p>Selected date: {date.toDateString()}</p>
    </div>
  );
};

export default MyCalendar;
