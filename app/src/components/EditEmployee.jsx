import React, { useState, useEffect } from 'react'
import { API_BASE_URL } from './api/endpoints'
import { useParams } from 'react-router-dom'

const editUser = () => {

    const [employee, setEmployee] = useState([])
    const [updatedEm, setUpdatedEm] = useState({name:'', email:'', password:''})

    const { id } = useParams()

    useEffect(() => {

        fetch(`${API_BASE_URL}/users/${id}`,{
        method: 'GET',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        })
        .then(res  => res.json())
        .then(data => setEmployee(data))

    },[])



    const handleSubmit = (event) => {
        event.preventDefault()

        fetch(`${API_BASE_URL}/users/${id}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(updatedEm)
        
        })
        .then(res => res.json())
        .then(data => setEmployee(data))

        setUpdatedEm({name:'', email:'', password:''})
    } 
    

    return (
        <>
            {/* will pass down the employee details as label */}
            <form onSubmit={handleSubmit}>
                <label>{employee.name}:
                    <input 
                    type="text" 
                    value={updatedEm.name}
                    onChange={(e) => setUpdatedEm({ ...updatedEm, name: e.target.value })}/>
                </label><br></br>
                <label>{employee.email}:
                    <input 
                    type="text" 
                    value={updatedEm.email}
                    onChange={(e) => setUpdatedEm({ ...updatedEm, email: e.target.value })}/>
                </label><br></br>
                <label>password:
                    <input type="text" 
                    value={updatedEm.password}
                    onChange={(e) => setUpdatedEm({ ...updatedEm, password: e.target.value })}/>
                </label><br></br>
                    {/* <label>Avaliablites:<br></br>
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
                </label><br></br> */}
                {/* need to play with DB for boolean of jobs */}
                
                <button type="submit">Update Account Details</button>
                
            </form>            
        </>
    )
  }
  

export default editUser