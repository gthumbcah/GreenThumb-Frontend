import React, { useState, useEffect } from 'react'
import { API_BASE_URL } from './api/endpoints'
import { useParams } from 'react-router-dom'

const ViewSingleJob = () => {
    const [job, setJob] = useState({})
    const { id } = useParams()

    useEffect(() => {
        fetch(`${API_BASE_URL}/jobs/${id}`,{
            method: 'GET',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res  => res.json())
        .then(data => {setJob(data)})
        .catch(error => {
            console.error('Error fetching job:', error);
        })
    }, [id])

    return (
        <>
            <h1> Customer Name:{job.customerDetails[0]}</h1>
            <p>Customer Details:{job.customerDetails[1]}
                                {job.customerDetails[2]}</p>
            <p>Location: {job.location}</p>
            <p>Salary: {job.salary}</p>
            {/* Render other job details here */}
        </>
    );
}

export default ViewSingleJob;
