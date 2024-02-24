import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { API_BASE_URL } from '../components/api/endpoints.js'
import Confirm from  './Confirm.jsx'


const Admin = () => {

  const [employees, setEmployees] = useState([])
  const [deleteOpt, setDeleteOpt] = useState(false)
  const [confirmation, setConfirmation] = useState(false)
  const [deleteEmployeeId, setDeleteEmployeeId] = useState(null)

  useEffect(() => {
  

    fetch(`${API_BASE_URL}/users`,{
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
   .then(res => res.json())
   .then(data => {setEmployees(data)})
  },[employees])

  const handleDelete = ((id)  => {
    setDeleteEmployeeId(id)
    setConfirmation(true)      
  })

  const handleConfirmSubmit = () => {
    fetch(`${API_BASE_URL}/users/${deleteEmployeeId}`,{
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(res => res.json())
    setConfirmation(false)
  }

  const handleCancelSubmit = () => {
    setConfirmation(false)
  }


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
          {confirmation && (
                <Confirm
                message="Are you sure you want to update the account details?"
                onConfirm={handleConfirmSubmit}
                onCancel={handleCancelSubmit}
                />
          )} 
        </>
      )
    }
  }
  return view() 
}

export default Admin