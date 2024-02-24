import React, { useState, useEffect } from 'react'
import { API_BASE_URL } from '../components/api/endpoints.js'
import { useParams } from 'react-router-dom'

const UserTimeSheet = () => {

    
  const [timeSheet, setTimeSheet] = useState([])
  const { id } = useParams()

  useEffect(() => {  

    fetch(`${API_BASE_URL}/timesheets`,{
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
   .then(res => res.json())
   .then(data => {setTimeSheet(data)})

  },[])

  return (
    <>        
        <div id="print-content">
            {timeSheet.map((entry, index) => (
                <p key={index}>{entry.total}</p>
            ))}
        </div>
        <button onClick={() => window.print()} className="print">Print</button>
    </>
  )
}

export default UserTimeSheet