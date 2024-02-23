import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { API_BASE_URL } from '../components/api/endpoints.js'


// a list of employees in a table in the middle
const employeeList = [ 'Employee1', 'Employee2', 'Employee3']

const Admin = () => {

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
    <div>
      <ul>
        {employees.map((employee, index) => (
          <ul key={index}>
            <Link to={`/edit/${employee._id}`} >{employee.name}</Link>            
          </ul>
        ))}
      </ul>
      <div><button type="Link"><Link to={`/Admin/create`}>Create Employee</Link></button></div>
    </div>
  )
}

// const employee = () => {
//   return null
// }

export default Admin