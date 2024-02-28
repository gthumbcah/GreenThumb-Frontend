import { API_BASE_URL } from './endpoints.js'; 

// Define clockIn and clockOut functions
export async function clockIn(jwtToken, timestamp) {
    try {
      const response = await fetch(`${API_BASE_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify({ timestamp }),
      });
      if (!response.ok) {
        throw new Error('Clock in failed:', response.statusText);
      }
      return response.json();
    } catch (error) {
      throw new Error('Clock in failed:', error.message);
    }
  }
  
  export async function clockOut(jwtToken, timestamp) {
    try {
      const response = await fetch(`${API_BASE_URL}/clock-out`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify({ timestamp }),
      });
      if (!response.ok) {
        throw new Error('Clock out failed:', response.statusText);
      }
      return response.json();
    } catch (error) {
      throw new Error('Clock out failed:', error.message);
    }
  }