import React, { useState } from 'react';
import { clockIn, clockOut } from './api/ClockAPI';

const ClockComponent = ({ jwtToken }) => {
  const [clockedIn, setClockedIn] = useState(false);
  const [jwtToken] = useState(localStorage.getItem('token')); 

  const handleClockIn = async () => {
      try {
          await clockIn(jwtToken);
          setClockedIn(true);
      } catch (error) {
          console.error('Clock in error:', error);
      }
  };

  const handleClockOut = async () => {
      try {
          await clockOut(jwtToken);
          setClockedIn(false);
      } catch (error) {
          console.error('Clock out error:', error);
      }
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