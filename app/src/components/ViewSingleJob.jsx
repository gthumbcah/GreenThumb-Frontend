import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from './api/endpoints';
import { useParams } from 'react-router-dom';

const ViewSingleJob = () => {
    const [job, setJob] = useState({});
    const { id } = useParams();

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/jobs/${id}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch job');
                }
                const data = await response.json();
                setJob(data);
            } catch (error) {
                console.error('Error fetching job:', error);
            }
        };
        fetchJob();
    }, [id]);

    return (
        <>
            <h1>Customer Name: {job.customerDetails && job.customerDetails[0]}</h1>
            <p>Customer Details: {job.customerDetails && job.customerDetails[1]} <br />
                {job.customerDetails && job.customerDetails[2]}</p>
            <p>Work to do: {job.tasks}</p>
            <p>Tools Needed: {job.toolsNeeded}</p>
            <p>Workers on Site: {job.users.name}</p>
            {/* Render other job details here */}
        </>
    );
};

export default ViewSingleJob;

