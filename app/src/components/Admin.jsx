import React from 'react'
import { Link } from 'react-router-dom'


// a list of employees in a table in the middle
const employeeList = [ 'Employee1', 'Employee2', 'Employee3']

const Admin = () => {
  return (
    <div>
      <ul>
        {employeeList.map((employee, index) => (
          <ul key={index}>
            <Link to={`/edit${employee}`} >{employee}</Link>
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