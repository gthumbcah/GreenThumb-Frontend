import React, { useState } from 'react';

const ClockComponent = () => {
  const [clockedIn, setClockedIn] = useState(false);
  const [clockInTime, setClockInTime] = useState(null);
  const [clockOutTime, setClockOutTime] = useState(null);

  const handleClockIn = () => {
    const currentTime = new Date().toISOString();
    setClockInTime(currentTime);
    setClockedIn(true);
    // Store clock-in time locally
    localStorage.setItem('clockInTime', currentTime);
  };

  const handleClockOut = () => {
    const currentTime = new Date().toISOString();
    setClockOutTime(currentTime);
    setClockedIn(false);
    // Store clock-out time locally
    localStorage.setItem('clockOutTime', currentTime);

    // Calculate time difference and submit to backend
    const timeDifference = calculateTimeDifference(clockInTime, currentTime);
    submitTimeDifference(timeDifference);
  };

  const calculateTimeDifference = (startTime, endTime) => {
    const start = new Date(startTime);
    const end = new Date(endTime);
    const difference = end - start; // Difference in milliseconds
    // Convert difference to hours and minutes
    const hours = Math.floor(difference / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    return { hours, minutes };
  };

  const submitTimeDifference = (timeDifference) => {
    // Submit time difference to backend
    // Replace this with your backend API call
    console.log('Time difference:', timeDifference);
  };

  return (
    <div>
      {clockedIn ? (
        <button onClick={handleClockOut}>Clock Out</button>
      ) : (
        <button onClick={handleClockIn}>Clock In</button>
      )}
    </div>
  );
};

export default ClockComponent;