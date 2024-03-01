import React, { useState, useEffect } from 'react'
import { API_BASE_URL } from '../components/api/endpoints.js'
import { useParams } from 'react-router-dom'
import './TimeSheet.css'

const UserTimeSheet = () => {

    
  const [timeSheet, setTimeSheet] = useState([])
  const { id } = useParams()

  useEffect(() => {  

    fetch(`${API_BASE_URL}/timesheets/${id}`,{
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
   .then(res => res.json())
   .then(data => {setTimeSheet(data)})

  },[])

  return (
    <div className="time-sheet-container">
      <table id="print-content">
        <thead>
          <tr>
            <th>Date</th>
            <th>Hours</th>
            <th>Rate</th>
            <th>Earnings</th>
          </tr>
        </thead>
        <tbody>
          {timeSheet.map((entry, index) => (
            <tr key={index}>
              <td>{entry.date}</td>
              <td>{entry.hours}</td>
              <td>${entry.rate}</td>
              <td>${entry.earnings.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => window.print()} className="print">Print</button>
    </div>
  );
};

export default UserTimeSheet