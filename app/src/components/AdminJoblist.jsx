import React, { useState, useEffect } from 'react';
import JobList from './JobList'; // Assuming JobList component is defined in a separate file

const AdminJoblist = () => {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch('https://greenthumb-backend.onrender.com/jobs', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setJobs(data.jobs); // Assuming the jobs array is nested under 'jobs' key in the response
                } else {
                    console.log('Failed to fetch jobs');
                }
            } catch (error) {
                console.error('Error fetching jobs:', error);
            }
        };

        fetchJobs();
    }, []);

    const editJob = (jobId) => {
        // Logic to navigate to the edit job page or handle editing the job
        console.log(`Editing job with ID ${jobId}`);
    };

    const deleteJob = (jobId) => {
        // Logic to delete the job
        console.log(`Deleting job with ID ${jobId}`);
    };

    return (
        <div>
            <h1>Admin Job List</h1>
            {jobs.length > 0 ? (
                <JobList jobs={jobs} editJob={editJob} deleteJob={deleteJob} />
            ) : (
                <p>No jobs found.</p>
            )}
        </div>
    );
};

export default AdminJoblist;
