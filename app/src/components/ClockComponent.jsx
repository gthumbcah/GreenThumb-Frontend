import React, { useState, useEffect } from 'react';

const ClockComponent = () => {
  const [clockedIn, setClockedIn] = useState(false);
  const [clockInTime, setClockInTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    // Start the timer when clocked in
    if (clockedIn) {
      const timer = setInterval(() => {
        // Calculate elapsed time since clock-in
        const currentTime = new Date().getTime();
        const startTime = new Date(clockInTime).getTime();
        const elapsed = currentTime - startTime;
        setElapsedTime(elapsed);
      }, 1000); // Update every second

      return () => {
        // Clean up timer when component unmounts or when clocked out
        clearInterval(timer);
      };
    }
  }, [clockedIn, clockInTime]);

  const handleClockIn = () => {
    const currentTime = new Date().toISOString();
    setClockInTime(currentTime);
    setClockedIn(true);
    // Store clock-in time locally
    localStorage.setItem('clockInTime', currentTime);
  };

  const handleClockOut = () => {
    const currentTime = new Date().toISOString();
    setClockInTime(null); // Reset clock-in time
    setElapsedTime(0); // Reset elapsed time
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

  const formatElapsedTime = (elapsed) => {
    const hours = Math.floor(elapsed / (1000 * 60 * 60));
    const minutes = Math.floor((elapsed % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((elapsed % (1000 * 60)) / 1000);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div>
      {clockedIn ? (
        <div>
          <p>Time elapsed: {formatElapsedTime(elapsedTime)}</p>
          <button onClick={handleClockOut}>Clock Out</button>
        </div>
      ) : (
        <button onClick={handleClockIn}>Clock In</button>
      )}
    </div>
  );
};

export default ClockComponent;