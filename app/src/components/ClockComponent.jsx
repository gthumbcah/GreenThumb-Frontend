import React, { useState } from 'react';
import { clockIn, clockOut } from './api/ClockAPI';

const ClockComponent = ({ jwtToken }) => {
  const [isClockedIn, setIsClockedIn] = useState(false);

  const handleClockInOut = async () => {
    try {
      if (isClockedIn) {
        // Clock out
        await clockOut(jwtToken, new Date());
      } else {
        // Clock in
        await clockIn(jwtToken, new Date());
      }
      setIsClockedIn(!isClockedIn);
    } catch (error) {
      console.error('Clock operation failed:', error);
    }
  };

  return (
    <div>
      <button onClick={handleClockInOut}>
        {isClockedIn ? 'Clock Out' : 'Clock In'}
      </button>
    </div>
  );
};

export default ClockComponent;