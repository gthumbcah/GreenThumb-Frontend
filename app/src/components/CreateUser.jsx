import React, { useState, useEffect } from 'react'
import { API_BASE_URL } from '../components/api/endpoints.js'


const CreateUser = () => {

    const [employeeName, setEmployeeName] = useState('')
    const [employeeEmail, setEmployeeEmail] = useState('')
    const [employeePass, setEmployeePass] = useState('')
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

    const handleSubmit = (event) => {

        event.preventDefault()

        const userData = {
            email: employeeEmail,
            name: employeeName,            
            password: employeePass
        }

        fetch(`${API_BASE_URL}/users`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(userData)
        })
        .then(res => res.json())
        .then(data => setEmployees(...employees, data))

        history.pushState('')

        // Clear input after submission
        setEmployeeEmail('')
        setEmployeeName('')
        setEmployeePass('')

    }    

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Email Adress:
                    <input 
                    type="text" 
                    value={employeeEmail} 
                    required
                    onChange={(e) => setEmployeeEmail(e.target.value)}/>
                </label><br></br>
                <label>Employee's Name:
                    <input 
                    type="text" 
                    value={employeeName}
                    required
                    onChange={(e) => setEmployeeName(e.target.value)}/>
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