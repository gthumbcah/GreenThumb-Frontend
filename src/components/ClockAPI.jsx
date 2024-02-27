import React, { useState } from 'react';

function ClockAPI() {
  // State variables to store clock in/out status and time
  const [clockedIn, setClockedIn] = useState(false);
  const [clockTime, setClockTime] = useState(null);

  // Function to handle clock in/out button click
  const handleClockInOut = () => {
    // Toggle clock in/out status
    setClockedIn(!clockedIn);

    // If clocking in, record the time
    if (!clockedIn) {
      const currentTime = new Date().toLocaleString();
      setClockTime(currentTime);
      // Perform API call to store clock in time in database
      // fetchClockIn(currentTime);
    } else {
      // If clocking out, perform API call to store clock out time in database
      // fetchClockOut();
    }
  };

  return (
    <div>
      <h2>Clock In/Out</h2>
      <p>Status: {clockedIn ? 'Clocked In' : 'Clocked Out'}</p>
      <p>Time: {clockTime || 'Not available'}</p>
      <button onClick={handleClockInOut}>
        {clockedIn ? 'Clock Out' : 'Clock In'}
      </button>
    </div>
  );
}

export default ClockAPI;