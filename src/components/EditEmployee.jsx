import React, { useState } from 'react'

const editUser = () => {

    const [employeeName, setEmployeeName] = useState('')
    const [employeeEmail, setEmployeeEmail] = useState('')
    const [employeeMob, setEmployeeMob] = useState('')
    const [employeePass, setEmployeePass] = useState('')
    // const [employeeAv, setEmployeeEmailAv] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()
    } 
    

    return (
        <div>
            {/* will pass down the employee details as label */}
            <form onSubmit={handleSubmit}>
                <label>Employee's Name:
                    <input 
                    type="text" 
                    value={employeeName}
                    onChange={(e) => setEmployeeName(e.target.value)}/>
                </label><br></br>
                <label>Email Adress:
                    <input 
                    type="text" 
                    value={employeeEmail}
                    onChange={(e) => setEmployeeEmail(e.target.value)}/>
                </label><br></br>
                <label>Mobile:
                    <input type="text" 
                    value={employeeMob}
                    onChange={(e) => setEmployeeMob(e.target.value)}/>
                </label><br></br>
                <label>Password:
                    <input type="text" 
                    value={employeePass}
                    onChange={(e) => setEmployeePass(e.target.value)}/>
                </label><br></br>
                    <label>Avaliablites:<br></br>
                    <label>Monday:</label>
                    <input type="checkbox"></input>
                    <label>Tuesday:</label>
                    <input type="checkbox"></input>
                    <label>Wednesday:</label>
                    <input type="checkbox"></input>
                    <label>Thursday:</label>
                    <input type="checkbox"></input>
                    <label>Friday:</label>
                    <input type="checkbox"></input>                    
                </label><br></br>
                
                <button type="submit">Update Account Details</button> {/* onSumbit in button and can remove most from form*/}
                
            </form>            
        </div>
    )
  }
  

export default editUser