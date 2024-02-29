import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from './api/endpoints';

const AdminJoblist = () => {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`${API_BASE_URL}/jobs`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setJobs(data);
                } else {
                    console.log('Failed to fetch jobs');
                }
            } catch (error) {
                console.error('Error fetching jobs:', error);
            }
        };

        fetchJobs();
    }, []);

const handleDelete = async (id) => {
    // Ask for confirmation before deleting
    const confirmDelete = window.confirm("Are you sure you want to delete this job?");
    if (!confirmDelete) {
        return; // Don't proceed with deletion if user cancels
    }

    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/jobs/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (response.ok) {
            setJobs(jobs.filter(job => job._id !== id));
            console.log('Job deleted successfully');
        } else {
            console.log('Failed to delete job');
        }
    } catch (error) {
        console.error('Error deleting job:', error);
    }
};


    return (
        <div>
            <h1>Admin Job List</h1>
            {jobs.map((job, index) => (
                <div key={index}>
                    <h2>Customer Name: {job.customerDetails && job.customerDetails[0]}</h2>
                    <h3>Workers on site:</h3>
                    <ul>
                        {job.users.map((user, index) => (
                            <li key={index}>{user.name}</li>
                        ))}
                    </ul>
                    <p>
                        {/* Use Link to navigate to EditJob component with job ID */}
                        <button><Link to={`/jobs/${job._id}`}>Edit</Link></button>
                        <button onClick={() => handleDelete(job._id)}>Delete</button>
                    </p>
                </div>
            ))}
        </div>
    );
};

export default AdminJoblist;



