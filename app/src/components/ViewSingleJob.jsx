import React, { useState, useEffect } from 'react'
import { API_BASE_URL } from './api/endpoints'
import { useParams } from 'react-router-dom'

const viewSingleJob = () => {
    const [job, setJob] = useState([])

    const { id } = useParams()

    useEffect(() => {

        fetch(`${API_BASE_URL}/jobs/${id}`,{
        method: 'GET',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        })
        .then(res  => res.json())
        .then(data => setJob(data))

    },[])

    
  return (
    <>
      {/* Your JSX to render the job information */}
    </>
  );
}

export default ViewSingleJob;