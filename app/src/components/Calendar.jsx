import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import ClockComponent from './ClockComponent';

const MyCalendar = ({ jwtToken }) => {
  const [jobs, setJobs] = useState([]);

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
          setJobs(data);
        } else {
          console.log('Failed to find jobs');
        }
      } catch (error) {
        console.error('Error finding jobs:', error);
      }
    };
  
    fetchData();
  }, []);

  const tileContent = ({ date }) => {
    const hasJobOnDate = jobs.some(job => job.dates.includes(date.toISOString().split('T')[0]));
    return hasJobOnDate && <div style={{ backgroundColor: 'red', borderRadius: '50%', height: '0.75rem', width: '0.75rem' , marginLeft:'0.75rem'}}></div>;
  };

  return (
    <div className="calendar-container">
      <h2>Calendar</h2>
      <Calendar 
        tileContent={tileContent}
      />
      <ClockComponent jwtToken={jwtToken} />
    </div>
  );
};

export default MyCalendar;



