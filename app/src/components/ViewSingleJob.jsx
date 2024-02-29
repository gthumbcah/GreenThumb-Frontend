import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from './api/endpoints';
import { useParams } from 'react-router-dom';

const ViewSingleJob = () => {
    const [job, setJob] = useState({});
    const { id } = useParams();

    useEffect(() => {
        console.log('ID parameter:', id); // Log the ID parameter
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
                console.log('Fetched job:', data); // Log the fetched job data
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
            <p>Customer Phone Number: {job.customerDetails && job.customerDetails[1]} </p>
            <p>Job Address: <a href={job.customerDetails && job.customerDetails[2]} target="_blank">{job.customerDetails && job.customerDetails[2]}</a> </p>   
            <p>Work to do: {job.tasks}</p>
            <p>Tools Needed: {job.toolsNeeded && job.toolsNeeded.map((tool, index) => <span key={index}>{tool}{index !== job.toolsNeeded.length - 1 && ', '}</span>)}</p>
            <p>Workers on Site: {job.users && job.users.map((user, index) => <span key={index}>{user.name}{index !== job.users.length - 1 && ', '}</span>)}</p>
        </>
    );
};

export default ViewSingleJob;



