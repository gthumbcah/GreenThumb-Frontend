
import React, { useState } from 'react'



const CreateUser = () => {

    const [employeeName, setEmployeeName] = useState('')
    const [employeeEmail, setEmployeeEmail] = useState('')
    const [employeeMob, setEmployeeMob] = useState('')
    const [employeePass, setEmployeePass] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()
    } 
    

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Employee's Name:
                    <input 
                    type="text" 
                    value={employeeName}
                    required
                    onChange={(e) => setEmployeeName(e.target.value)}/>
                </label><br></br>
                <label>Email Adress:
                    <input 
                    type="text" 
                    value={employeeEmail} 
                    required
                    onChange={(e) => setEmployeeEmail(e.target.value)}/>
                </label><br></br>
                <label>Mobile:
                    <input type="text" 
                    value={employeeMob} 
                    required
                    onChange={(e) => setEmployeeMob(e.target.value)}/>
                </label><br></br>
                <label>Password:
                    <input type="text" 
                    value={employeePass} 
                    required
                    onChange={(e) => setEmployeePass(e.target.value)}/>
                </label><br></br>
                <button type="submit">Create</button>
            </form>            
        </div>
    )
  }
  
  export default CreateUser