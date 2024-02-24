import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { API_BASE_URL } from '../components/api/endpoints.js'

const Admin = () => {

  const [employees, setEmployees] = useState([])

  const [deleteOpt, setDeleteOpt] = useState(false)

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

  const handleDelete = ((id)  => {
    
    fetch(`${API_BASE_URL}/users/${id}`,{
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(res => res.json())
    .then(data => console.log(data))
  })


  const view = () => {

    if (!deleteOpt) {
      return (
        <>
          <ul>
            {employees.map((employee, index) => (
              <ul key={index}>
                <Link to={`/edit/${employee._id}`} >{employee.name}</Link>            
              </ul>
            ))}
          </ul>
          <div>
            <button type="Link"><Link to={`/Admin/create`}>Create Employee</Link></button>
            <button onClick={() => setDeleteOpt(true)}>Delete Employee</button>
          </div>
        </>
    )} else {
      return(
        <>
          <ul>
            {employees.map((employee, index) => ( !employee.admin && (
              <ul key={index}>
                <button className='deleteEm'
                  onClick={() => handleDelete(employee._id)}>{employee.name}</button>
              </ul>)
            ))}
          </ul>
          <div>
          <button onClick={() => setDeleteOpt(false)}>Return to Employee Selector</button>
          </div>
        </>
      )
    }
  }

  return view()
  
}

export default Admin