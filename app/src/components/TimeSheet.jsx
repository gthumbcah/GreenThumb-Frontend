import React, { useState, useEffect } from 'react'
import { API_BASE_URL } from './api/endpoints.js'
import { Link } from 'react-router-dom'

const TimeSheet = () => {

  const [employees, setEmployees] = useState([])

  useEffect(() => {

   fetch(`${API_BASE_URL}/users`,{
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
 .then(res => res.json())
 .then(data => {setEmployees(data)})

  },[])
  
  return (
    <>
      <ul className="employee-list" >
        {employees.map((employee, index) => (
          <ul className="employee-item" key={index}>
            <Link to={`/timesheet/${employee._id}`} >{employee.name}</Link>            
          </ul>
        ))}
      </ul>
    </>
  )
}

export default TimeSheet