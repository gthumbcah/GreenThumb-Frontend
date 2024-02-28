import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import ClockComponent from './ClockComponent';

const MyCalendar = ({ jwtToken }) => {
  const [jobs, setJobs] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [jobsForSelectedDate, setJobsForSelectedDate] = useState([]);

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

  const handleClickDay = (date) => {
    console.log("Selected date:", date);
    setSelectedDate(date);
    const formattedDate = date.toISOString().split('T')[0];
    const jobsOnSelectedDate = jobs.filter(job => job.dates.includes(formattedDate));
    setJobsForSelectedDate(jobsOnSelectedDate);
  };

  return (
    <div className="calendar-container">
      <h2>Calendar</h2>
      <Calendar 
        tileContent={tileContent}
        onClickDay={handleClickDay}
      />
      {selectedDate && (
        <div className="jobs-list">
          <h3>Jobs for {selectedDate.toDateString()}</h3>
          <ul>
            {jobsForSelectedDate.map((job, index) => (
              <li key={index}>
                <Link to={`/job/${job._id}`}>{job.customerDetails[0]}</Link> - {`${job.dates.length} day job`}
                {<ClockComponent jwtToken={jwtToken} />}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MyCalendar;




